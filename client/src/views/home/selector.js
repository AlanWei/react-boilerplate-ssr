import { createSelector } from 'reselect';
import filter from 'lodash/filter';

const topicsSelector = state => state.home.topics;
const usersSelector = state => state.home.users;

const userTopicSelector = createSelector(
  topicsSelector,
  usersSelector,
  (topics, users) => {
    const selectedUser = filter(users, user => (user.id === 1));
    const selectedTopics = filter(topics, topic => (topic.id === selectedUser.id));
    return {
      user: selectedUser,
      topics: selectedTopics,
    };
  },
);

export default {
  topicsSelector,
  usersSelector,
  userTopicSelector,
};
