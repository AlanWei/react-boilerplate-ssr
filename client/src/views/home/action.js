import createAsyncAction from 'utils/createAsyncAction';

function getTopics() {
  return createAsyncAction('HOME_GET_TOPICS', () => (
    Promise.resolve({
      data: {
        users: [{
          id: 1,
          name: 'Alan',
        }, {
          id: 2,
          name: 'Ben',
        }],
        topics: [{
          id: 1,
          title: 'First',
        }, {
          id: 2,
          title: 'Second',
        }],
      },
    })
  ));
}

export default {
  getTopics,
};
