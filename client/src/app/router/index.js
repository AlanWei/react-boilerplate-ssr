import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import map from 'lodash/map';
import history from '../history';
import routes from './routes';

const Router = () => (
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
);

export default Router;
