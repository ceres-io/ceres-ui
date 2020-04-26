import { Action, Dispatch, Middleware } from 'redux';
import { isPlainObject } from 'lodash';




export const actionClassMiddleware: Middleware = () => (next: Dispatch) => <A extends Action>(action: A) => {
  console.log('middleware invoked')
  if (isPlainObject(action)) {
    return next(action);
  }
  else {
    console.log('making plain')
    return next((Object as any).assign({}, action))
  }
}