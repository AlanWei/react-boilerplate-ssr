import map from 'lodash/map';

function createChainedAsyncAction(first, handlers) {
  return dispatch => (
    first(dispatch)
      .then((resultAction) => {
        map(handlers, (handler) => {
          const { status, callback } = handler;
          const expectedStatus = `_${status.toUpperCase()}`;

          if (resultAction.type.indexOf(expectedStatus) !== -1) {
            callback(resultAction.payload)(dispatch);
          }
        });
      })
  );
}

export default createChainedAsyncAction;
