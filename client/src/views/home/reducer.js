import createReducer from 'utils/createReducer';

const defaultState = () => ({
  users: [],
  topics: [],
});

const getTopicsSuccess = (state, action) => ({
  ...state,
  users: action.payload.data.users,
  topics: action.payload.data.topics,
});

export default createReducer(defaultState, {
  HOME_GET_TOPICS_SUCCESS: getTopicsSuccess,
});
