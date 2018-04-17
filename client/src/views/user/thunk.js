import homeAction from '../home/action';
import action from './action';

const thunk = store => (
  Promise.all([
    store.dispatch(homeAction.getMessage()),
    store.dispatch(action.getUser()),
  ])
);

export default thunk;
