
export interface ICreateAccountFormInput {
  email?: string,
  password?: string,
  passwordVerification?: string
}

export interface ICreateAccountFormEvent {
  onNext: (dataEntry: any) => void
}

export interface ICreateAccountViewModel {
  validEmail?: boolean,
  validPassword?: boolean,
  matchingPassword?: boolean

  canAdvance: boolean
}

export type CreateAccountFormProps = ICreateAccountFormInput & ICreateAccountFormEvent;