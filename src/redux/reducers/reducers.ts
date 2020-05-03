import { ISignUpState, signUpReducer } from './signUpReducer';
import { Reducer, combineReducers } from 'redux';
import { IShoppingState, shoppingReducer } from './shoppingReducer';
import { ICheckoutState, checkoutReducer } from './checkoutReducer';


export interface IState {
  signUp: ISignUpState,
  shopping: IShoppingState,
  checkout: ICheckoutState
}


export const ceresReducers: Reducer<IState> = combineReducers({
  signUp: signUpReducer,
  shopping: shoppingReducer,
  checkout: checkoutReducer
})