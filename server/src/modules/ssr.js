const ReactDOM = require('react-dom/server');
const { matchRoutes } = require('react-router-config');
const { Helmet } = require('react-helmet');
const createHistory = require('history/createMemoryHistory').default;
const get = require('lodash/get');
const head = require('lodash/head');
const { getClientInstance } = require('../client');

// Initializes the store with the starting url = require( request.
function configureStore(req, client) {
  console.info('server path', req.originalUrl);

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
// Note: Each function in the promise chain beyond the thenable context
// should return the context or modified context.
function serverRender(req, res) {
  const client = getClientInstance(res.locals.clientFolders);
  const { store, history, routes } = configureStore(req, client);

  const branch = matchRoutes(routes, req.originalUrl);
  const thunk = get(head(branch), 'route.thunk', () => {});

  Promise.resolve(null)
    .then(thunk(store))
    .then(setContextForThenable({ client, store, history }))
    .then(renderToHtml)
    .then((context) => {
      res.send(context.renderedHtml);
      return context;
    })
    .catch((err) => {
      console.error(`SSR error: ${err}`);
    });
}

module.exports = serverRender;
