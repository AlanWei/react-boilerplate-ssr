import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import reduxThunk from 'redux-thunk';
import history from './history';
import reducers from './reducers';

const ENV = process.env.NODE_ENV;

const routeMiddleware = routerMiddleware(history);
const middlewares = [
  routeMiddleware,
  reduxThunk,
];

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  ENV === 'development' ? composeEnhancers(applyMiddleware(...middlewares)) : applyMiddleware(...middlewares),
);

export default store;
