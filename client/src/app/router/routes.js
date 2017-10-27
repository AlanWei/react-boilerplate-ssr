import loadable from 'react-loadable';

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
  component: AsyncHome,
}, {
  path: '/user',
  component: AsyncUser,
}];

export default routes;
