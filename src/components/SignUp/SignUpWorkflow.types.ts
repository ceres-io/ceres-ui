export enum SignUpWorkflowStep {
  Account,
  Location
}

export interface ISignUpWorkflowInput {
  email?: string,
  password?: string,
  firstName?: string,
  lastName?: string,
  zipCode?: string
}

export interface ISignUpWorkflowEvent {
  onSubmit?: (dataEntry: any) => void;
}

export interface ISignUpWorkflowDraft {
  step: SignUpWorkflowStep,

  email?: string,
  password?: string,

  firstName?: string,
  lastName?: string,
  zipCode?: string
}

export interface ISignUpWorkflowViewModel {
  email?: string,
  password?: string,
  firstName?: string,
  lastName?: string,
  zipCode?: string,

  step: SignUpWorkflowStep,

  showAccountInput: boolean,
  showDetailsInput: boolean,
}

export type SignUpWorkflowProps = ISignUpWorkflowInput & ISignUpWorkflowEvent;