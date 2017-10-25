import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from 'app/store';
import Router from 'app/router';

import './styles/index.scss';

const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

ReactDOM.render(<App />, window.document.getElementById('app'));
