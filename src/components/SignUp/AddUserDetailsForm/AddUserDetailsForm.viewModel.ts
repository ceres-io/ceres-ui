import { createSelector } from 'reselect';
import { IAddUserDetailsFormInput, IAddUserDetailsFormViewModel } from './AddUserDetailsForm.types';

type TransformTo<T> = (input: IAddUserDetailsFormInput) => T;

const firstNameSelector: TransformTo<string | undefined> = input => input.firstName;
const lastNameSelector: TransformTo<string | undefined> = input => input.lastName;
const zipCodeSelector: TransformTo<string | undefined> = input => input.zipCode;


const validName = (name: string): boolean => {
  let nameRe = /[a-z]+$/i
  return nameRe.test(name);
}

const validFirstNameSelector: TransformTo<boolean | undefined> = createSelector(
  firstNameSelector,
  (firstName) => {
    if (firstName !== undefined)
      return validName(firstName);
  }
)

const validLastNameSelector: TransformTo<boolean | undefined> = createSelector(
  lastNameSelector,
  (lastName) => {
    if (lastName !== undefined)
      return validName(lastName);
  }
)

const validZipCodeSelector: TransformTo<boolean | undefined> = createSelector(
  zipCodeSelector,
  (zipCode) => {
    let zipRe = /[0-9]{5}/i;
    if (zipCode !== undefined)
      return zipRe.test(zipCode);
  }
)

export const viewModelSelector: TransformTo<IAddUserDetailsFormViewModel> = createSelector(
  validFirstNameSelector,
  validLastNameSelector,
  validZipCodeSelector,
  (validFirstName, validLastName, validZipCode) => {
    return {
      validFirstName,
      validLastName,
      validZipCode,
      canAdvance: validFirstName !== undefined && validFirstName
        && validLastName !== undefined && validLastName && validZipCode !== undefined && validZipCode
    }
  }
)