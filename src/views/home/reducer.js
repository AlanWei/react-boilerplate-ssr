import createReducer from 'utils/createReducer';

const defaultState = () => ({
  topics: [],
});

const getTopicsSuccess = (state, action) => ({
  ...state,
  topics: action.payload,
});

export default createReducer(defaultState, {
  HOME_GET_BANNERS_SUCCESS: getTopicsSuccess,
});
