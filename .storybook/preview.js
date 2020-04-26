import React from 'react';
import { createReduxStore } from '../src/redux/store/createStore';
import { configureRouter } from '../src/routes/configureRouter';
import { addDecorator } from '@storybook/react';
import { Provider } from 'react-redux';

const router = configureRouter();
const store = createReduxStore(router);

addDecorator(s =>
  <Provider store={store}>
    {s()}
  </Provider>
);