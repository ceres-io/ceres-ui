import React from 'react';
import produce from 'immer';
import { CreateAccountFormProps, ICreateAccountViewModel, ICreateAccountFormInput } from './CreateAccountForm.types';
import { TextField, Container, Button } from '@material-ui/core';
import { viewModelSelector } from './CreateAccountForm.viewModel';

class CreateAccountForm extends React.Component<CreateAccountFormProps, ICreateAccountViewModel> {
  private _draft: ICreateAccountFormInput;

  constructor(props: CreateAccountFormProps) {
    super(props);

    this._draft = {}

    this.state = this.getViewModel();
  }

  public getViewModel(): ICreateAccountViewModel {
    return viewModelSelector(this._draft);
  }

  public updateViewModel(): void {
    this.setState(this.getViewModel());
  }

  public render() {
    const viewModel = this.state;

    return (
      <Container>
        <TextField
          error={viewModel.validEmail !== undefined && !viewModel.validEmail}
          label="email"
          onChange={this.onEmailInputChange}
        />
        <TextField label="password" onChange={this.onPasswordInputChange} />
        <TextField label="password verification" onChange={this.onPasswordVerificationChange} />
        <Button onClick={this.onNextClick} disabled={!viewModel.canAdvance}>Next</Button>
      </Container>
    )
  }

  public readonly onEmailInputChange = (event: any) => {
    this._draft = produce(this._draft, (next) => {
      next.email = event.target.value
    })

    this.updateViewModel();
  }

  public readonly onPasswordInputChange = (event: any) => {
    this._draft = produce(this._draft, (next) => {
      next.password = event.target.value
    })

    this.updateViewModel();
  }

  public readonly onPasswordVerificationChange = (event: any) => {
    this._draft = produce(this._draft, (next) => {
      next.passwordVerification = event.target.value
    })

    this.updateViewModel();
  }

  public readonly onNextClick = (event: any) => {

    // TODO - this should really be part of viewModel but later...
    const dataEntry = {
      email: this._draft.email,
      password: this._draft.password
    }

    this.props.onNext(dataEntry);
  }
}

export default CreateAccountForm;