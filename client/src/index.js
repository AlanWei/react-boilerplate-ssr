import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import app from 'app/index';

import './styles/index.scss';

let client;

try {
  // eslint-disable-next-line no-underscore-dangle
  if (typeof window.__INITIAL_STATE__ !== 'object') {
    throw new Error('Unable to load initial state');
  }

  // eslint-disable-next-line no-underscore-dangle
  client = app.createStore(createBrowserHistory(), window.__INITIAL_STATE__);
} catch (err) {
  // eslint-disable-next-line no-console
  console.error(`Error when initialising store: ${err}`);
  client = app.createStore(createBrowserHistory(), {});
}

const application = app.createApp(client.store, client.history);
ReactDOM.render(application, window.document.getElementById('app'));
