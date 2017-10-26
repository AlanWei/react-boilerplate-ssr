import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import app from 'app/index';

import './styles/index.scss';

const history = createBrowserHistory();
const application = app.createApp(history);

ReactDOM.render(application, window.document.getElementById('app'));
