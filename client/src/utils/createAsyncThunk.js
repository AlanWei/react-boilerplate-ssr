import get from 'lodash/get';

function promisify(value) {
  if (typeof value.then === 'function') {
    return value;
  }

  if (process.env.IS_SERVER && Array.isArray(value)) {
    return Promise.all(value);
  }

  return value;
}

function createAsyncThunk(thunk) {
  return (dispatch, getState) => (
    thunk()
      .then(component => get(component, 'default', component))
      .then(component => component(dispatch, getState))
      .then(component => promisify(component))
  );
}

export default createAsyncThunk;
