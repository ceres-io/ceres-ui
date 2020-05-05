import React, { FunctionComponent } from 'react';
import { ShoppingCartSidebarProps } from './ShoppingCartSidebar.types';

import { Paper, makeStyles, Typography, Container, Grid, Divider, createStyles, Theme, Table, TableBody, TableContainer, Button } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { ShoppingCartItem } from './ShoppingCartItem/ShoppingCartItem';
import { CartTotal } from './CartTotal/CartTotal';
import { useSelector } from 'react-redux';
import { IApplicationStore } from '../../redux/store/store.types';
import { useRouter } from 'react-router5';
import { RouteNames } from '../../routes/routes';

const SIDEBAR_ELEVATION = 2;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 450,
      position: 'sticky',
      top: theme.spacing(1),
      alignSelf: 'flex-start',
      height: '88vh'
    },
    content: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      height: '100%'
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
      margin: 0,
      paddingBottom: theme.spacing(2),
      // height: 570,
      height: '65%'
    },
    checkoutButton: {
      paddingTop: theme.spacing(2),
      textAlign: 'center'
    }
  })
)

export const ShoppingCartSidebar: FunctionComponent<ShoppingCartSidebarProps> = (props) => {

  const classes = useStyles();
  const router = useRouter();

  const selectedProducts = useSelector((store: IApplicationStore) => store.ceres.shopping.products);

  const onCheckoutClick = () => {
    router.navigate(RouteNames.Checkout)
  }

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
                selectedProducts.map(p =>
                  <ShoppingCartItem key={p.type.name} product={p} />
                )
              }
            </TableBody>
          </Table>
        </TableContainer>
        <CartTotal products={selectedProducts} />
        {props.showCheckoutButton &&
          <div className={classes.checkoutButton}>
            <Button
              disabled={selectedProducts.length == 0}
              variant='contained'
              color='primary'
              className='checkout-button'
              onClick={onCheckoutClick}
            >
              Checkout
            </Button>
          </div>
        }
      </Container>
    </Paper>
  );
}