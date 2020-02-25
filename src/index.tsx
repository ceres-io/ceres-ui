import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createReduxStore } from './redux/store/createStore';
import { configureRouter } from './routes/configureRouter';
import { RouterProvider } from 'react-router5';

const router = configureRouter();
const store = createReduxStore(router);
const rootElement = document.getElementById('root');

const index = (
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);

router.start((err, state) => {
  ReactDOM.render(index, rootElement);
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
