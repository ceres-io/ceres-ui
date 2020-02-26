export interface IAddUserDetailsFormInput {
  firstName?: string,
  lastName?: string,
  zipCode?: string
}

export interface IAddUserDetailsFormEvent {
  onSubmit: (dataEntry: any) => void
}

export interface IAddUserDetailsFormViewModel {
  validFirstName?: boolean,
  validLastName?: boolean,
  validZipCode?: boolean,

  canAdvance: boolean
}

export type AddUserDetailsFormProps = IAddUserDetailsFormInput & IAddUserDetailsFormEvent;