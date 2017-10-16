import React from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import loadable from 'react-loadable';
import store from './store';
import history from './history';
import '../styles/index.scss';

const Loading = () => (
  <div>Loading</div>
);

const AsyncHome = loadable({
  loader: () => import('../views/home'),
  loading: Loading,
});

const AsyncAllStores = loadable({
  loader: () => import('../views/allStores'),
  loading: Loading,
});

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={AsyncHome} />
        <Route path="/all-stores" component={AsyncAllStores} />
      </div>
    </ConnectedRouter>
  </Provider>
);

export default App;
