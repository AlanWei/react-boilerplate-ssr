import action from './action';

export default function thunk(store) {
  store.dispatch(action.getTopics());
}
