import { createSelector } from 'reselect';
import { ICreateAccountFormInput, ICreateAccountViewModel } from "./CreateAccountForm.types"


type TransformTo<T> = (input: ICreateAccountFormInput) => T;

const emailSelector: TransformTo<string | undefined> = input => input.email;
const passwordSelector: TransformTo<string | undefined> = input => input.password;
const passwordVerificationSelector: TransformTo<string | undefined> = input => input.passwordVerification;

const isEmpty = (string: string | undefined) => {
  return !string || string.length == 0;
}

const validEmailSelector: TransformTo<boolean | undefined> = createSelector(
  emailSelector,
  (email) => {
    let emailRe = /[0-9a-z]+@[a-z]+.com/i;
    if (email !== undefined)
      return emailRe.test(email);
  }
)

const validPasswordSelector: TransformTo<boolean> = createSelector(
  passwordSelector,
  (password) => {
    return password !== undefined && !isEmpty(password) && password.length > 6;
  }
)

const matchingPasswordSelector: TransformTo<boolean> = createSelector(
  passwordSelector,
  passwordVerificationSelector,
  (password, passwordVerification) => {
    return password === passwordVerification;
  }
)

const canAdvanceSelector: TransformTo<boolean> = createSelector(
  validEmailSelector,
  validPasswordSelector,
  matchingPasswordSelector,
  (validEmail, validPassword, matchingPasswords) => {
    return validEmail !== undefined && validEmail && validPassword && matchingPasswords;
  }
)

export const viewModelSelector: TransformTo<ICreateAccountViewModel> = createSelector(
  validEmailSelector,
  validPasswordSelector,
  matchingPasswordSelector,
  canAdvanceSelector,
  (validEmail, validPassword, matchingPassword, canAdvance) => {
    return {
      validEmail,
      validPassword,
      matchingPassword,
      canAdvance
    }
  }
)