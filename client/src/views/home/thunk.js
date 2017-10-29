import action from './action';

const thunk = dispatch => ([
  dispatch(action.getTopics()),
]);

export default thunk;
