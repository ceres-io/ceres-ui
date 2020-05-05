import React, { FunctionComponent } from 'react';
import { TextField, Container, makeStyles, Theme, createStyles } from '@material-ui/core';
import { UserLogin } from '../../components/UserLogin/UserLogin';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginCard: {

  }
}))

export const Login: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.loginCard}>
        <UserLogin />
      </div>
    </div>
  );
}
