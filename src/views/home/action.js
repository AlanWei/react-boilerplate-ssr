import createAsyncAction from 'utils/createAsyncAction';
import api from 'utils/api';

function getBanners() {
  return createAsyncAction('HOME_GET_BANNERS', () => (
    api.get('https://www.v2ex.com/api/topics/hot.json')
  ));
}

export default {
  getBanners,
};
