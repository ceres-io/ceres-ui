import React, { FunctionComponent, useEffect } from 'react';
import { Login } from '../login/Login';
import { MainProps, IMainInput } from './Main.types';
import { RouteNames } from '../../routes/routes';
import { Home } from '../home/Home';
import Signup from '../signup/Signup';
import { Shop } from '../shop/Shop';
import { Checkout } from '../checkout/Checkout';
import { Delivery } from '../placeDelivery/Delivery';
import { Track } from '../trackDelivery/Track';
import { useRoute } from 'react-router5';


export const Main: FunctionComponent<MainProps> = props => {
  const route = useRoute();

  switch (route.route.name) {
    case RouteNames.SignUp: {
      return <Signup />
    }
    case RouteNames.Shop: {
      return <Shop />
    }
    case RouteNames.Checkout: {
      return <Checkout />
    }
    case RouteNames.Delivery: {
      return <Delivery />;
    }
    case RouteNames.Track: {
      return <Track estTimeMinutes={26474510 + 40000} trackingId="74Q#ThvB#r" />;
    }
    case RouteNames.Login: {
      return <Login />
    }
    default:
      return <Home />;
  }
}
