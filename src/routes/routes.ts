import { Route } from "router5";

export enum RouteNames {
  Base = 'ceres',
  Home = 'ceres.home',
  Login = 'ceres.login',
  SignUp = 'ceres.signup'
}

export const routes: Route[] = [
  {
    name: 'ceres',
    path: '/ceres'
  },
  {
    name: RouteNames.Home,
    path: '/home'
  },
  {
    name: RouteNames.Login,
    path: '/login'
  },
  {
    name: RouteNames.SignUp,
    path: '/signup'
  }
]

