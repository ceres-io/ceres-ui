
export interface IAppBarHeaderInput {
  firstName?: string
}

export interface IAppBarHeaderEvent {
  onLogin?: () => void;
  onSignUp?: () => void;
}

export type AppBarHeaderProps = IAppBarHeaderInput & IAppBarHeaderEvent;