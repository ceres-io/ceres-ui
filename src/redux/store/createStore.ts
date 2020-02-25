import { combineReducers, createStore, applyMiddleware, Store } from 'redux';
import { router5Reducer, router5Middleware } from 'redux-router5';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { Router } from 'router5';
import { IApplicationStore } from './store.types';

export function createReduxStore(router: Router, initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const routerMiddleware = router5Middleware(router);
  const loggerMiddleware = createLogger();

  const middlewares = [routerMiddleware, loggerMiddleware];

  const createStoreWithMiddleware = composeWithDevTools(
    applyMiddleware(
      ...middlewares
    )
  )(createStore);

  const reducers = combineReducers({
    router: router5Reducer,
  })

  const store: Store = createStoreWithMiddleware(
    reducers,
    // initialState
  )

  // sagaMiddleware.run()

  // @ts-ignore
  // window.store = store

  return store;
}