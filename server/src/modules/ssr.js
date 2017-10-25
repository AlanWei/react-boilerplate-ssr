/* eslint-disable func-style */
// import ReactDOM from 'react-dom/server';
// import { Helmet } from 'react-helmet';
// import createHistory from 'history/createMemoryHistory';
// import get from 'lodash/get';
// import last from 'lodash/last';
// import split from 'lodash/split';
import { getClientInstance } from '../client';
// import logger from '../logger';

// Prepares the HTML string and the appropriate headers
// and subequently string replaces them into their placeholders
// function renderToHtml(context) {
//   const appObject = context.client.app.init(context.store, context.initialComponent);
//   const appString = ReactDOM.renderToString(appObject);
//   const helmet = Helmet.renderStatic();
//   const initialState = JSON.stringify(context.store.getState()).replace(/</g, '\\u003c');

//   context.renderedHtml = context.client
//     .html()
//     .replace(/<!--appContent-->/g, appString)
//     .replace(/<!--appState-->/g, `<script>window.__INITIAL_STATE__ = ${initialState}</script>`)
//     .replace(/<\/head>/g, [
//       helmet.title.toString(),
//       helmet.meta.toString(),
//       helmet.link.toString(),
//       '</head>',
//     ].join('\n'))
//     .replace(/<html>/g, `<html ${helmet.htmlAttributes.toString()}>`)
//     .replace(/<body>/g, `<body ${helmet.bodyAttributes.toString()}>`);

//   return context;
// }

// SSR Main method
//
// Note: Each function in the promise chain beyond the thenable context
// should return the context or modified context.
function serverRender(req, res) {
  const client = getClientInstance(res.locals.clientFolders);
  console.log(client);
  // const {store, thunk} = configureStore(req, client);

  // Promise.resolve(null)
  //   .then(() => setCookies(req, client))
  //   .then(() => setSystemInfo(req, store, client))
  //   .then(() => initClient(store, client))
  //   .then(() => thunk(store))
  //   .then(setContextForThenable({ client, res, store }))
  //   .then(checkLocationType)
  //   .then(resolveClientComponent)
  //   .then(renderToHtml)
  //   .then(setStatusHeaders)
  //   .then((context) => {
  //     res.send(context.renderedHtml);
  //     return context;
  //   })
  //   .catch((err) => {
  //     if (err) {
  //       if (err.message === 'redirect' || err.message === 'not-implemented') {
  //         logger.info('Redirect - ', err.route.path);
  //         res.redirect(err.route.status, err.route.path);
  //         return;
  //       }
  //     }

  //     logger.error(err);

  //     const renderedHtmlError = client
  //       .htmlError()
  //       .replace(/<!--appContent-->/g, 'Server Error');

  //     res.send(renderedHtmlError);
  //   });
}

export default serverRender;
