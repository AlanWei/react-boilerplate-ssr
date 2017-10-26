import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

const ENV = process.env.NODE_ENV;

function createAppStore(history, preloadedState = {}) {
  // enhancers
  let composeEnhancers = compose;

  if (typeof window !== 'undefined' && ENV === 'development') {
    // eslint-disable-next-line no-underscore-dangle
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }

  // middlewares
  const routeMiddleware = routerMiddleware(history);
  const middlewares = [
    routeMiddleware,
    reduxThunk,
  ];

  const store = createStore(
    combineReducers({
      ...reducers,
      router: routerReducer,
    }),
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  return store;
}

export default createAppStore;
