import { createSelector } from 'reselect';
import findIndex from 'lodash/findIndex';
import appSelector from 'app/selector';

const articleSelector = state => state.article.article;

const currentArticleIndexSelector = createSelector(
  articleSelector,
  appSelector.articlesSelector,
  (article, articles) => (
    findIndex(articles, art => (art.id === article.id))
  ),
);

export default {
  currentArticleIndexSelector,
};
