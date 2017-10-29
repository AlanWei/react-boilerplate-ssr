import createReducer from 'utils/createReducer';

const defaultState = () => ({
  frameworks: [],
});

const getFrameworksSuccess = (state, action) => ({
  ...state,
  frameworks: action.payload.data.frameworks,
});

export default createReducer(defaultState, {
  HOME_GET_FRAMEWORKS_SUCCESS: getFrameworksSuccess,
});
