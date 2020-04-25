import { ISignUpState, signUpReducer } from './signUpReducer';
import { Reducer, combineReducers } from 'redux';
import { IShoppingState, shoppingReducer } from './shoppingReducer';


export interface IState {
  signUp: ISignUpState,
  shopping: IShoppingState
}


export const ceresReducers: Reducer<IState> = combineReducers({
  signUp: signUpReducer,
  shopping: shoppingReducer
})