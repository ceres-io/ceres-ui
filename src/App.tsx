import React from 'react';
import AppBarHeader from './components/AppBarHeader/AppBarHeader';
import { Container, ThemeProvider, createMuiTheme } from '@material-ui/core';
import { Main } from './views/main/Main';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2e7d32'
    },
    secondary: {
      main: '#7cb342'
    }
  }
});

const App: React.FunctionComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container >
        <AppBarHeader />
        <Main />
      </Container>
    </ThemeProvider>
  );
}

export default App;
