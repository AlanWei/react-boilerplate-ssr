import ReactDOM from 'react-dom/server';
import { matchRoutes } from 'react-router-config';
import { Helmet } from 'react-helmet';
import createHistory from 'history/createMemoryHistory';
import get from 'lodash/get';
import map from 'lodash/map';
import { getClientInstance } from '../client';

// Initializes the store with the starting url from request.
function configureStore(req, client) {
  console.log('server path', req.originalUrl);

  const history = createHistory({ initialEntries: [req.originalUrl] });
  const preloadedState = {};

  return client.app.createStore(history, preloadedState);
}

// This essentially starts passing down the "context"
// object to the Promise "then" chain.
function setContextForThenable(context) {
  return () => context;
}

// Prepares the HTML string and the appropriate headers
// and subequently string replaces them into their placeholders
function renderToHtml(context) {
  const { client, store, history } = context;
  const appObject = client.app.createApp(store, history);
  const appString = ReactDOM.renderToString(appObject);
  const helmet = Helmet.renderStatic();
  const initialState = JSON.stringify(store.getState()).replace(/</g, '\\u003c');

  context.renderedHtml = client
    .html()
    .replace(/<!--appContent-->/g, appString)
    .replace(/<!--appState-->/g, `<script>window.__INITIAL_STATE__ = ${initialState}</script>`)
    .replace(/<\/head>/g, [
      helmet.title.toString(),
      helmet.meta.toString(),
      helmet.link.toString(),
      '</head>',
    ].join('\n'))
    .replace(/<html>/g, `<html ${helmet.htmlAttributes.toString()}>`)
    .replace(/<body>/g, `<body ${helmet.bodyAttributes.toString()}>`);

  return context;
}

// SSR Main method
//
// Note: Each function in the promise chain beyond the thenable context
// should return the context or modified context.
function serverRender(req, res) {
  const client = getClientInstance(res.locals.clientFolders);
  const { store, history, routes } = configureStore(req, client);

  const branch = matchRoutes(routes, req.url);
  const matchRoute = map(branch, (route) => (
    console.log(route.route, 'route')
  ));

  Promise.resolve(null)
    .then(setContextForThenable({ client, store, history }))
    .then(renderToHtml)
    .then((context) => {
      res.send(context.renderedHtml);
      return context;
    })
    .catch((err) => {
      console.log(`SSR error: ${err}`);
    });
}

export default serverRender;
