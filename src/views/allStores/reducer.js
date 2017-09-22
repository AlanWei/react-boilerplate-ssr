export const defaultState = () => ({
  stores: '',
});

export default (state = defaultState(), action = {}) => {
  switch (action.type) {
    case 'GET_STORES':
      return {
        stores: action.payload,
      };
    default:
      return state;
  }
};
