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

let composeEnhancers = compose;

if (typeof window !== 'undefined') {
  // eslint-disable-next-line no-underscore-dangle
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  ENV === 'development' ? composeEnhancers(applyMiddleware(...middlewares)) : applyMiddleware(...middlewares),
);

export default store;
