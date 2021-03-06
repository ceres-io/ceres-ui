import React from 'react';
import { createReduxStore } from '../src/redux/store/createStore';
import { configureRouter } from '../src/routes/configureRouter';
import { addDecorator } from '@storybook/react';
import { Provider } from 'react-redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { RouterProvider } from 'react-router5';

const router = configureRouter();
const store = createReduxStore(router);

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


addDecorator(s =>
  <Provider store={store}>
    <RouterProvider router={router}>
      <ThemeProvider theme={theme}>
        {s()}
      </ThemeProvider>
    </RouterProvider>
  </Provider>
);