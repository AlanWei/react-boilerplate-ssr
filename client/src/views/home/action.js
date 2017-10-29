import createAsyncAction from 'utils/createAsyncAction';

function getFrameworks() {
  return createAsyncAction('HOME_GET_FRAMEWORKS', () => (
    Promise.resolve({
      data: {
        frameworks: [{
          id: 1,
          title: 'React',
        }, {
          id: 2,
          title: 'Angular',
        }, {
          id: 3,
          title: 'Vue',
        }],
      },
    })
  ));
}

export default {
  getFrameworks,
};
