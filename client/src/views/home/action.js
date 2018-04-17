import createAsyncAction from 'utils/createAsyncAction';
import api from 'utils/api';

function getMessage() {
  return createAsyncAction('HOME_GET_MESSAGE', () => (
    api.get('/message')
  ));
}

export default {
  getMessage,
};
