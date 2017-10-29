import action from './action';

const thunk = store => (
  Promise.all([
    store.dispatch(action.getTopics()),
  ])
);

export default thunk;
