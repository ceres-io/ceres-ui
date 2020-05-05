import { ISignUpState, signUpReducer } from './signUpReducer';
import { Reducer, combineReducers } from 'redux';
import { IShoppingState, shoppingReducer } from './shoppingReducer';
import { ICheckoutState, checkoutReducer } from './checkoutReducer';
import { IAccountState, accountReducer } from './accountReducer';


export interface IState {
  signUp: ISignUpState,
  shopping: IShoppingState,
  checkout: ICheckoutState,
  account: IAccountState
}


export const ceresReducers: Reducer<IState> = combineReducers({
  signUp: signUpReducer,
  shopping: shoppingReducer,
  checkout: checkoutReducer,
  account: accountReducer
})