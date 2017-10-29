import loadable from 'react-loadable';
import homeThunk from 'views/home/thunk';

const Loading = () => (
  'Loading'
);

const AsyncHome = loadable({
  loader: () => import('../../views/home'),
  loading: Loading,
});

const AsyncUser = loadable({
  loader: () => import('../../views/user'),
  loading: Loading,
});

const routes = [{
  path: '/',
  exact: true,
  component: AsyncHome,
  thunk: homeThunk,
}, {
  path: '/user',
  component: AsyncUser,
  thunk: () => {},
}];

export default routes;
