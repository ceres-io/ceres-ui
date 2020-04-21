import React, { FunctionComponent } from 'react';
import { ShoppingCartSidebarProps } from './ShoppingCartSidebar.types';

import { Paper, makeStyles, Typography, Container, Grid, Divider, createStyles, Theme, Table, TableBody, TableContainer, Button } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { ShoppingCartItem } from './ShoppingCartItem/ShoppingCartItem';
import { CartTotal } from './CartTotal/CartTotal';

const SIDEBAR_ELEVATION = 2;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 450
    },
    content: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2)
    },
    divider: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1)
    },
    table: {
      tableLayout: 'fixed',
      width: '92%'
    },
    tableContainer: {
      paddingBottom: theme.spacing(2),
      height: 720,
    },
    checkoutButton: {
      paddingTop: theme.spacing(2),
      textAlign: 'center'
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
        <TableContainer className={classes.tableContainer}>
          <Table className={classes.table}>
            <TableBody>
              {
                props.selectedProducts.map(p =>
                  <ShoppingCartItem key={p.type.name} product={p} />
                )
              }
            </TableBody>
          </Table>
        </TableContainer>
        <CartTotal products={props.selectedProducts} />
        <div className={classes.checkoutButton}>
          <Button variant='contained' color='primary'>
            Checkout
        </Button>
        </div>
      </Container>
    </Paper>
  );
}