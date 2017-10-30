import action from './action';

const thunk = store => ([
  store.dispatch(action.getFrameworks()),
]);

export default thunk;
