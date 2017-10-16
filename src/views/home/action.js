import createAsyncAction from 'utils/createAsyncAction';
import api from 'utils/api';

function getTopics() {
  return createAsyncAction('HOME_GET_TOPICS', () => (
    api.get('https://www.v2ex.com/api/topics/hot.json')
  ));
}

export default {
  getTopics,
};
