import action from './action';

const thunk = store => (
  Promise.all([
    store.dispatch(action.getFrameworks()),
  ])
);

export default thunk;
