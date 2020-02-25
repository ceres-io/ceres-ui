import { Route } from "router5";

export enum RouteNames {
  Base = 'ceres',
  Home = 'ceres.home',
  Login = 'ceres.login'
}

export const routes: Route[] = [
  {
    name: 'ceres',
    path: '/ceres'
  },
  {
    name: 'ceres.home',
    path: '/home'
  },
  {
    name: 'ceres.login',
    path: '/login'
  }
]

