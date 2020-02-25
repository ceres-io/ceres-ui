import React from 'react';
import Login from '../login/Login';
import { MainProps, IMainInput } from './Main.types';
import { RouteNames } from '../../routes/routes';
import Home from '../home/Home';
import { createRouteNodeSelector } from 'redux-router5';
import { connect } from 'react-redux';
import { IApplicationStore } from '../../redux/store/store.types';


const Main: React.FunctionComponent<MainProps> = props => {
  switch (props.currentRouteName) {
    case RouteNames.Login: {
      return <Login />;
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