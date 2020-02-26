
// export interface ISignupInput {
//   email: string,
//   password: string,
//   firstName: string,
//   lastName: string,
//   zipCode: number,
// }

export interface ISignupEvent {
  onSubmit: (dataEntry: any) => void;
}

export type SignupProps = ISignupEvent