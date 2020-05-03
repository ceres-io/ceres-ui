import React from 'react';
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


const Main: React.FunctionComponent<MainProps> = props => {
  switch (props.currentRouteName) {
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

function mapStateToProps(store: IApplicationStore): IMainInput {
  return {
    currentRouteName: createRouteNodeSelector('')(store).route.name
  }
}

export default connect(mapStateToProps)(Main);