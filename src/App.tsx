import React from 'react';
import { AppBarHeader } from './components/AppBarHeader/AppBarHeader';
import { Container, ThemeProvider, createMuiTheme, makeStyles, createStyles, Theme } from '@material-ui/core';
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

const useStyles = makeStyles((theme: Theme) => createStyles({
  content: {
    background: 'white'
  }
}))

const App: React.FunctionComponent = () => {

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <AppBarHeader />
      <div className={classes.content}>
        <Main />
      </div>
    </ThemeProvider>
  );
}

export default App;
