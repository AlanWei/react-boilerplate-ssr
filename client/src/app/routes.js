import loadable from 'react-loadable';

const Loading = () => (
  'Loading'
);

const AsyncHome = loadable({
  loader: () => import('../views/home'),
  loading: Loading,
});

const AsyncAnswers = loadable({
  loader: () => import('../views/answers'),
  loading: Loading,
});

const routes = [{
  path: '/',
  component: AsyncHome,
}, {
  path: '/answers',
  component: AsyncAnswers,
}];

export default routes;
