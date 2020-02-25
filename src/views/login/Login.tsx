import React from 'react';
import { TextField, Container } from '@material-ui/core';

const Login: React.FunctionComponent = () => {
  return (
    <Container>
      <TextField label="username" />
      <TextField label="password" />
    </Container>
  );
}

export default Login;