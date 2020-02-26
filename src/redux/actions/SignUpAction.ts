import { SIGN_UP } from './SignUpAction.types';

// TODO - move actions to classes and add action-class middleware
export const signUpActionSuccess = (dataEntry: any) => {
  return {
    type: SIGN_UP,
    payload: dataEntry
  }
}