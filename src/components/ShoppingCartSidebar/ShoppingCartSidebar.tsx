import React, { FunctionComponent } from 'react';
import { ShoppingCartSidebarProps } from './ShoppingCartSidebar.types';

import { Paper, makeStyles, Typography, Container, Grid, Divider, createStyles, Theme } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { ShoppingCartItem } from './ShoppingCartItem/ShoppingCartItem';

const SIDEBAR_ELEVATION = 2;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 450
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
)

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
        {
          props.selectedProducts.map(p =>
            <ShoppingCartItem product={p} />
          )
        }

      </Container>
    </Paper>
  );
}