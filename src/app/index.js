import React from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store from './store';
import history from './history';
import views from '../views';
import '../styles/index.scss';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={views.Home} />
        <Route path="/all-stores" component={views.AllStores} />
      </div>
    </ConnectedRouter>
  </Provider>
);

export default App;
