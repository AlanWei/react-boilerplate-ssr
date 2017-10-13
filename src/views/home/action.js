import createAsyncAction from 'utils/createAsyncAction';
import createChainedAsyncAction from 'utils/createChainedAsyncAction';
import api from 'utils/api';

function getTopics() {
  return createAsyncAction('HOME_GET_TOPICS', () => (
    api.get('https://www.v2ex.com/api/topics/hot.json')
  ));
}

function getUser(id) {
  return createAsyncAction('HOME_GET_USER', () => (
    new Promise((resolve, reject) => {
      if (id === 1) {
        setTimeout(() => {
          resolve({
            name: 'Alan',
            age: 24,
          });
        }, 1000);
      } else {
        setTimeout(() => {
          reject({
            error: true,
            message: 'wrong user id',
          });
        }, 1000);
      }
    })
  ));
}

function getArticles(user) {
  return createAsyncAction('HOME_GET_ARTICLES', () => (
    new Promise((resolve, reject) => {
      if (user.age >= 18) {
        setTimeout(() => {
          resolve([{
            title: 'article 1',
          }, {
            title: 'article 2',
          }]);
        }, 1000);
      } else {
        setTimeout(() => {
          reject({
            error: true,
            message: 'user need to be at least 18',
          });
        }, 1000);
      }
    })
  ));
}

function getArticle(id) {
  return createAsyncAction('HOME_GET_ARTICLE', () => (
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          content: 'abc',
        });
      }, 1000);
    })
  ));
}

function getUserArticles(id) {
  const handlers = [{
    status: 'success',
    callback: getArticles,
  }, {
    status: 'error',
    callback: payload => (() => {
      console.log(payload);
    }),
  }];

  return createChainedAsyncAction(getUser(id), handlers);
}

function getUserSpecficArtile(userId, articleId) {
  const firstAction = getUserArticles(userId);
  const callbackAction = getArticle(articleId);

  const handlers = [{
    status: 'success',
    callback: callbackAction,
  }, {
    status: 'error',
    callback: () => (() => {}),
  }];

  console.log(firstAction);

  // return createChainedAsyncAction(firstAction, handlers);
}

function loginWithFacebook(facebookId, facebookToken) {
  return createAsyncAction('APP_LOGIN_WITH_FACEBOOK', () => (
    api.post('/auth/facebook', {
      facebook_id: facebookId,
      facebook_token: facebookToken,
    })
  ));
}

function signupWithFacebook(facebookId, facebookToken, facebookEmail) {
  return createAsyncAction('APP_SIGNUP_WITH_FACEBOOK', () => (
    api.post('/accounts', {
      authentication_type: 'facebook',
      facebook_id: facebookId,
      facebook_token: facebookToken,
      email: facebookEmail,
    })
  ));
}

function connectWithFacebook(facebookId, facebookToken, facebookEmail) {
  const firstAction = loginWithFacebook(facebookId, facebookToken);
  const callbackAction = signupWithFacebook(facebookId, facebookToken, facebookEmail);

  const handlers = [{
    status: 'success',
    callback: () => (() => {}), // 用户登陆成功
  }, {
    status: 'error',
    callback: callbackAction, // 使用 facebook 账户登陆失败，尝试帮用户注册新账户
  }];

  return createChainedAsyncAction(firstAction, handlers);
}

const redirectToPage = (dispatch, page) => {
  const redirectUrl = get(page, 'payload.data.redirectUrl');

  return {
    type: 'REDIRECT_USER',
    payload: redirectUrl,
  }
}

function redirectUser(id, systemInfo) {
  const query = {
    userId: id,
    browserName: systemInfo.browserName || '',
    browserPlatform: systemInfo.browserPlatform || '',
    browserVersion: systemInfo.browserVersion || '',
    ipAddress: systemInfo.ip || '',
    mobileDevice: systemInfo.uaString || '',
  };

  const action = createAsyncAction('GET_REDIRECT_URL', () => (
    api.get('/user', query)
  ));

  return createAsyncSideEffect('success', action, [
    redirectToPage,
    ... // 数组中的同步 action 将顺序执行
  ]);
}

export default {
  getTopics,
  getUser,
  getUserArticles,
  connectWithFacebook,
  getUserSpecficArtile,
};
