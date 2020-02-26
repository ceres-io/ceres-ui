import React from 'react';
import SignUpWorkflow from '../../components/SignUp/SignUpWorkflow';
import { Dispatch } from 'redux';
import { actions } from 'redux-router5';
import { RouteNames } from '../../routes/routes';
import { signUpActionSuccess } from '../../redux/actions/SignUpAction';
import { SignupProps } from './Signup.types';
import { connect } from 'react-redux';


const Signup: React.FunctionComponent<SignupProps> = props => {
  return (
    <SignUpWorkflow onSubmit={props.onSubmit} />
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onSubmit: (dataEntry: any) => {
      dispatch(signUpActionSuccess(dataEntry));
      dispatch(actions.navigateTo(RouteNames.Home));
    },
  }
}

export default connect(null, mapDispatchToProps)(Signup);