import React, { FunctionComponent, useEffect } from 'react';
import Login from '../login/Login';
import { MainProps, IMainInput } from './Main.types';
import { RouteNames } from '../../routes/routes';
import Home from '../home/Home';
import { createRouteNodeSelector } from 'redux-router5';
import { connect } from 'react-redux';
import { IApplicationStore } from '../../redux/store/store.types';
import Signup from '../signup/Signup';
import { Shop } from '../shop/Shop';
import { Checkout } from '../checkout/Checkout';
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
      return <Checkout products={[]} cards={[]} addresses={[]} />
    }
    default:
      return <Home />;
  }
}
