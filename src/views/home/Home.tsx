import React from 'react';
import { Container, Paper } from '@material-ui/core';
import { IApplicationStore } from '../../redux/store/store.types';
import { HomeProps } from './Home.types';
import { connect } from 'react-redux';

const Home: React.FunctionComponent<HomeProps> = props => {
  return (
    <Container>
      {props.firstName === undefined && 'Please sign up to continue'}
      {props.firstName !== undefined && 'Welcome to Ceres, ' + props.firstName + '!'}
    </Container>
  );
}

const mapStateToProps = (store: IApplicationStore) => {
  return {
    firstName: store.ceres.signUp.firstName
  }
}

export default connect(mapStateToProps)(Home);