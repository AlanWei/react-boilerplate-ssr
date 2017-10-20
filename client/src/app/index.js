import React from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import map from 'lodash/map';
import store from './store';
import routes from './routes';
import history from './history';
import '../styles/index.scss';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        {map(routes, route => (
          <Route
            key={route.path}
            exact={route.path === '/'}
            path={route.path}
            component={route.component}
          />
        ))}
      </div>
    </ConnectedRouter>
  </Provider>
);

export default App;
