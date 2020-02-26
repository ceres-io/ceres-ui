import React from 'react';
import produce from 'immer';
import { AddUserDetailsFormProps, IAddUserDetailsFormViewModel, IAddUserDetailsFormInput } from './AddUserDetailsForm.types';
import { viewModelSelector } from './AddUserDetailsForm.viewModel';
import { TextField, Container, Button } from '@material-ui/core';

class AddUserDetailsForm extends React.Component<AddUserDetailsFormProps, IAddUserDetailsFormViewModel> {
  private _draft: IAddUserDetailsFormInput;

  constructor(props: AddUserDetailsFormProps) {
    super(props);

    this._draft = {}

    this.state = this.getViewModel();
  }

  public getViewModel(): IAddUserDetailsFormViewModel {
    return viewModelSelector(this._draft);
  }

  public updateViewModel(): void {
    this.setState(this.getViewModel());
  }

  public render() {

    const viewModel = this.state;

    return (
      <Container>
        <TextField label="first name" onChange={this.onFirstNameInputChange} />
        <TextField label="last name" onChange={this.onLastNameInputChange} />
        <TextField label="zip code" onChange={this.onZipCodeInputChange} />
        <Button onClick={this.onFinishClick} disabled={!viewModel.canAdvance}>Finish</Button>
      </Container>
    );
  }

  public readonly onFirstNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this._draft = produce(this._draft, (next) => {
      next.firstName = event.target.value
    })

    this.updateViewModel();
  }

  public readonly onLastNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this._draft = produce(this._draft, (next) => {
      next.lastName = event.target.value
    })

    this.updateViewModel();
  }

  public readonly onZipCodeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this._draft = produce(this._draft, (next) => {
      next.zipCode = event.target.value
    })

    this.updateViewModel();
  }

  public readonly onFinishClick = (event: any) => {

    // TODO - should be viewModel
    const dataEntry = {
      firstName: this._draft.firstName,
      lastNmae: this._draft.lastName,
      zipCode: this._draft.zipCode
    }

    this.props.onSubmit(dataEntry);
  }
}

export default AddUserDetailsForm;