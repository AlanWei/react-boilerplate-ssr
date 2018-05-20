import Home from 'views/home';
import homeThunk from 'views/home/thunk';
import User from 'views/user';
import userThunk from 'views/user/thunk';

const routes = [{
  path: '/',
  exact: true,
  component: Home,
  thunk: homeThunk,
}, {
  path: '/user',
  component: User,
  thunk: userThunk,
}];

export default routes;
