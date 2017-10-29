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
          title: 'React',
        }, {
          id: 2,
          title: 'Angular',
        }],
      },
    })
  ));
}

export default {
  getTopics,
};
