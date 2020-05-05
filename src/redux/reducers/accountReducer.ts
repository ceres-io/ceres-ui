import produce from 'immer';
import { AccountActions, ActionName } from '../actions/AccountAction';


export interface IAccountState {
  loggedIn: boolean
  username?: string
}

const initialAccountState: IAccountState = {
  loggedIn: false
}

export const accountReducer = (state: IAccountState = initialAccountState, action: AccountActions) => {
  return produce(state, next => {
    switch (action.type) {
      case (ActionName.Login): {
        next.loggedIn = true
        next.username = action.payload.username
      }
    }
  })
}