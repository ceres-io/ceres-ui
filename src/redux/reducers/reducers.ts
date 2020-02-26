import { ISignUpState, signUpReducer } from './signUpReducer';
import { Reducer, combineReducers } from 'redux';


export interface IState {
  signUp: ISignUpState
}


export const ceresReducers: Reducer<IState> = combineReducers({
  signUp: signUpReducer
})