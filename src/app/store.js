import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import history from './history';
import reducers from './reducers';

const ENV = process.env.NODE_ENV;

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = routerMiddleware(history);

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  ENV === 'development' ? composeEnhancers(applyMiddleware(middleware)) : applyMiddleware(middleware),
);

export default store;
