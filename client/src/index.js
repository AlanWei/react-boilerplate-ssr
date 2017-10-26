import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import app from 'app/index';

import './styles/index.scss';

const { store, history } = app.createStore(createBrowserHistory(), {});

const application = app.createApp(store, history);
ReactDOM.render(application, window.document.getElementById('app'));
