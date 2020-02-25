import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Theme, makeStyles, createStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { actions } from 'redux-router5';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppBarHeaderProps } from './AppBarHeader.types';
import { RouteNames } from '../../routes/routes';

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
        <Button color="inherit" onClick={props.onNavigate}>Login</Button>
      </Toolbar>
    </AppBar>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onNavigate: () => {
      dispatch(actions.navigateTo(RouteNames.Login));
    },
  }
}

export default connect(null, mapDispatchToProps)(AppBarHeader);