import action from './action';

const thunk = store => (
  Promise.all([
    store.dispatch(action.getMessage()),
  ])
);

export default thunk;
