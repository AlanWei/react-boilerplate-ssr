import createReducer from 'utils/createReducer';

const defaultState = () => ({
  banners: [],
});

const getBannersSuccess = (state, action) => ({
  ...state,
  banners: action.payload,
});

export default createReducer(defaultState, {
  HOME_GET_BANNERS_SUCCESS: getBannersSuccess,
});
