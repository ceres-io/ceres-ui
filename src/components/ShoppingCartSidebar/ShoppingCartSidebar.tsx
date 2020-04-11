import React, { FunctionComponent } from 'react';
import { ShoppingCartSidebarProps } from './ShoppingCartSidebar.types';

import { Paper, makeStyles, Typography, Container, Grid, Divider } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const SIDEBAR_ELEVATION = 2;

const useStyles = makeStyles({
  root: {
    // maxWidth: 200
  },
  content: {
    paddingTop: 20,
    paddingBottom: 20
  },
  divider: {
    paddingTop: 10,
    paddingBottom: 10
  }
})

export const ShoppingCartSidebar: FunctionComponent<ShoppingCartSidebarProps> = (props) => {

  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={SIDEBAR_ELEVATION}>
      <Container className={classes.content} maxWidth="lg" >
        <Grid container justify="flex-start" alignContent="center" alignItems="center" spacing={1}>
          <Grid item>
            <Typography variant='h5'>
              Shopping Cart
            </Typography>
          </Grid>
          <Grid item>
            <ShoppingCartIcon />
          </Grid>
        </Grid>
        <div className={classes.divider}>
          <Divider />
        </div>
      </Container>
    </Paper>
  );
}