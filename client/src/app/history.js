import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';

export default process.env.IS_SERVER ? createMemoryHistory() : createBrowserHistory();
