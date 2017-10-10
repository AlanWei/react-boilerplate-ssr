import createReducer from 'utils/createReducer';

const defaultState = () => ({
  topics: [],
  user: {},
  articles: [],
  errorMessage: '',
});

const getTopicsSuccess = (state, action) => ({
  ...state,
  topics: action.payload,
});

const getUserSuccess = (state, action) => ({
  ...state,
  user: action.payload,
});

const getUserError = (state, action) => ({
  ...state,
  errorMessage: action.payload.message,
});

const getArticlesSuccess = (state, action) => ({
  ...state,
  articles: action.payload,
});

const getArticlesError = (state, action) => ({
  ...state,
  errorMessage: action.payload.message,
});

export default createReducer(defaultState, {
  HOME_GET_TOPICS_SUCCESS: getTopicsSuccess,
  HOME_GET_USER_SUCCESS: getUserSuccess,
  HOME_GET_USER_ERROR: getUserError,
  HOME_GET_ARTICLES_SUCCESS: getArticlesSuccess,
  HOME_GET_ARTICLES_ERROR: getArticlesError,
});
