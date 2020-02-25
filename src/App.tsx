import React from 'react';
import AppBarHeader from './components/AppBarHeader/AppBarHeader';
import { Container } from '@material-ui/core';
import Main from './views/main/Main';

const App: React.FunctionComponent = () => {
  return (
    <Container >
      <AppBarHeader />
      <Main />
    </Container>
  );
}

export default App;
