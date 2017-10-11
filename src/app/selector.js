import { createSelector } from 'reselect';

const userSelector = state => state.app.user;
const articlesSelector = state => state.app.articles;

const userArticlesInfoSelector = createSelector(
  userSelector,
  articlesSelector,
  (user, articles) => (`${user.name} has ${articles.count} articles`),
);

export default {
  userSelector,
  articlesSelector,
  userArticlesInfoSelector,
};
