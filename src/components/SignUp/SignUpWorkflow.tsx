import React from 'react';
import { SignUpWorkflowProps, ISignUpWorkflowViewModel, ISignUpWorkflowDraft, SignUpWorkflowStep } from './SignUpWorkflow.types';
import CreateAccountForm from './CreateAccountForm/CreateAccountForm';
import AddUserDetailsForm from './AddUserDetailsForm/AddUserDetailsForm';
import { viewModelSelector } from './SignUpWorkflow.viewModel';
import { Container } from '@material-ui/core';
import produce from 'immer';

class SignUpWorkflow extends React.Component<SignUpWorkflowProps, ISignUpWorkflowViewModel> {
  private _draft: ISignUpWorkflowDraft;

  constructor(props: SignUpWorkflowProps) {
    super(props);
    this._draft = {
      step: SignUpWorkflowStep.Account
    }

    this.state = this.getViewModel();
  }

  public getViewModel(): ISignUpWorkflowViewModel {
    return viewModelSelector(this._draft);
  }

  public updateViewModel(): void {
    this.setState(this.getViewModel());
  }


  public render() {
    const viewModel = this.state;
    console.log(viewModel);
    return (
      <Container>
        {
          viewModel.showAccountInput &&
          <CreateAccountForm onNext={this.onAccountFormSubmit} />
        }
        {
          viewModel.showDetailsInput &&
          <AddUserDetailsForm onSubmit={this.onUserDetailsFormSubmit} />
        }
      </Container>
    );
  }

  // TODO - later create dataEntry type and just override between steps
  public readonly onAccountFormSubmit = (dataEntry: any) => {
    this._draft = produce(this._draft, (next) => {
      next.email = dataEntry.email
      next.password = dataEntry.password

      next.step = SignUpWorkflowStep.Location
    })

    this.updateViewModel();
  }

  public readonly onUserDetailsFormSubmit = (dataEntry: any) => {
    this._draft = produce(this._draft, (next) => {
      next.firstName = dataEntry.firstName
      next.lastName = dataEntry.lastName
      next.zipCode = dataEntry.zipCode
    })

    this.updateViewModel();

    if (this.props.onSubmit) {
      // TODO - this should be viewModel
      this.props.onSubmit(this._draft);
    }
  }
}

export default SignUpWorkflow;
