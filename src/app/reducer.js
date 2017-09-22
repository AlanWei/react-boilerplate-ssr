export const defaultState = () => ({
  isLogin: false,
});

export default (state = defaultState(), action = {}) => {
  switch (action.type) {
    default:
      return state;
  }
};
