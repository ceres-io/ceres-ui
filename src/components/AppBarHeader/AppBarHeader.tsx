import React, { FunctionComponent } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Theme, makeStyles, createStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { actions } from 'redux-router5';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppBarHeaderProps } from './AppBarHeader.types';
import { RouteNames } from '../../routes/routes';
import { IApplicationStore } from '../../redux/store/store.types';
import { useRouter } from 'react-router5';

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

// TODO - hide on scroll maybe
export const AppBarHeader: FunctionComponent<AppBarHeaderProps> = (props: AppBarHeaderProps) => {

  const classes = useStyles();

  const router = useRouter();

  const onShopClick = () => {
    router.navigate(RouteNames.Shop);
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Ceres
        </Typography>

        <Button color='inherit' onClick={onShopClick}>Shop Now</Button>

        {/* {props.firstName === undefined &&
          <Button color="inherit" onClick={props.onSignUp}>Sign Up</Button>}
        {props.firstName !== undefined &&
          <Button color="inherit" onClick={props.onLogin}>Login</Button>} */}

      </Toolbar>
    </AppBar>
  )
}
