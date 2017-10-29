import loadable from 'react-loadable';
import createAsyncThunk from 'utils/createAsyncThunk';
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
}, {
  path: '/user/:id',
  component: AsyncHome,
}];

export default routes;
