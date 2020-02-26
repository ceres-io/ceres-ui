import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Theme, makeStyles, createStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { actions } from 'redux-router5';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppBarHeaderProps } from './AppBarHeader.types';
import { RouteNames } from '../../routes/routes';
import { IApplicationStore } from '../../redux/store/store.types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
);

const AppBarHeader: React.FunctionComponent<AppBarHeaderProps> = (props: AppBarHeaderProps) => {

  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Ceres
        </Typography>
        {props.firstName === undefined &&
          <Button color="inherit" onClick={props.onSignUp}>Sign Up</Button>}
        {props.firstName !== undefined &&
          <Button color="inherit" onClick={props.onLogin}>Login</Button>}

      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = (store: IApplicationStore) => {
  return {
    firstName: store.ceres.signUp.firstName
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onSignUp: () => {
      dispatch(actions.navigateTo(RouteNames.SignUp));
    },
    onLogin: () => {
      dispatch(actions.navigateTo(RouteNames.Login));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBarHeader);