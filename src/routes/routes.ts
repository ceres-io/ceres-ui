import { Route } from "router5";

export enum RouteNames {
  Base = 'ceres',
  Home = 'ceres.home',
  Login = 'ceres.login',
  SignUp = 'ceres.signup',
  Shop = 'ceres.shop',
  Checkout = 'ceres.checkout',
  Delivery = 'ceres.delivery',
  Track = 'ceres.track'
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
  },
  {
    name: RouteNames.Shop,
    path: '/shop'
  },
  {
    name: RouteNames.Checkout,
    path: '/checkout'
  },
  {
    name: RouteNames.Delivery,
    path: '/delivery'
  },
  {
    name: RouteNames.Track,
    path: '/delivery/track'
  }
]

