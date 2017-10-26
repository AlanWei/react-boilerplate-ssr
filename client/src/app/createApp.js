import React from 'react';
import { Provider } from 'react-redux';
import Router from './router';
import createStore from './createStore';

function createApp(history) {
  const store = createStore(history, {});
  return (
    <Provider store={store}>
      <Router history={history} />
    </Provider>
  );
}

export default createApp;
