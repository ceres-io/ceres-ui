import { Action } from 'redux';

export enum ActionName {
  Login = '@Account/login',
  Logout = '@Account/logout'
}

export interface ILoginPayload {
  username: string
}

export class LoginAction implements Action<ActionName> {
  type = ActionName.Login
  constructor(public payload: ILoginPayload) {
  }
}

export type AccountActions = LoginAction