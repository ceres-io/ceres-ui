import { createSelector } from 'reselect';
import { ISignUpWorkflowDraft, SignUpWorkflowStep, ISignUpWorkflowViewModel } from './SignUpWorkflow.types';

type TransformTo<T> = (input: ISignUpWorkflowDraft) => T;

const inputSelector: TransformTo<ISignUpWorkflowDraft> = input => input;
const stepInputSelector: TransformTo<SignUpWorkflowStep> = input => input.step;


// Doesn't need complex logic here atm to check if ready, or based on current workflow input, etc.
// AKA currently no need to do any step adjustments
const nextStepSelector: TransformTo<SignUpWorkflowStep> = createSelector(
  inputSelector,
  stepInputSelector,
  (input, requestedNextStep) => {
    return requestedNextStep;
  }
)

export const viewModelSelector: TransformTo<ISignUpWorkflowViewModel> = createSelector(
  inputSelector,
  nextStepSelector,
  (input, step) => {
    return {
      email: input.email,
      password: input.password,

      firstName: input.firstName,
      lastName: input.lastName,
      zipCode: input.zipCode,

      showAccountInput: step === SignUpWorkflowStep.Account && (!input.email || !input.password),
      showDetailsInput: step === SignUpWorkflowStep.Location,
      step
    }
  }
)