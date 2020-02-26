import produce from 'immer';
import { Reducer, AnyAction } from 'redux';
import { SIGN_UP } from '../actions/SignUpAction.types';

export interface ISignUpState {
  firstName?: string;
}

export const initialSignUpState: ISignUpState = {}

export const signUpReducer: Reducer = (state: ISignUpState = initialSignUpState, action: AnyAction): ISignUpState => {
  const nextState = produce(state, draft => {
    switch (action.type) {
      case SIGN_UP: {
        draft.firstName = action.payload.firstName
      }
    }
  })

  return nextState;
}