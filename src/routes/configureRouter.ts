import createRouter, { Router } from 'router5';
import { routes, RouteNames } from './routes';
import browserPlugin from 'router5-plugin-browser';
import loggerPlugin from 'router5-plugin-logger';

export function configureRouter() {
  const router: Router = createRouter(routes, {
    defaultRoute: RouteNames.Home
  })

  const plugins = [browserPlugin({ useHash: false }), loggerPlugin]

  router.usePlugin(...plugins)

  return router;
}