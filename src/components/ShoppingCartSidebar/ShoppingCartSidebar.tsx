import React, {FunctionComponent} from 'react';
import {ShoppingCartSidebarProps} from './ShoppingCartSidebar.types';

import {
  Button,
  Container,
  createStyles,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableContainer,
  Theme,
  Typography
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {ShoppingCartItem} from './ShoppingCartItem/ShoppingCartItem';
import {CartTotal} from './CartTotal/CartTotal';
import {useDispatch, useSelector} from 'react-redux';
import {IApplicationStore} from '../../redux/store/store.types';
import {useRouter} from 'react-router5';
import {RouteNames} from '../../routes/routes';
import {Close} from "@material-ui/icons";
import {ProductDeletionUndoAction, ProductDeletionUndoExpirationAction} from "../../redux/actions/ShoppingAction";

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
  const dispatch = useDispatch();

  const selectedProducts = useSelector((store: IApplicationStore) => store.ceres.shopping.products);
  const dory = useSelector((store: IApplicationStore) => store.ceres.shopping.dory);

  const onCheckoutClick = () => {
    router.navigate(RouteNames.Checkout)
  }

  const onToastClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(new ProductDeletionUndoExpirationAction())
  }

  const onUndo = () => {
    dispatch(new ProductDeletionUndoAction())
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
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={dory !== undefined}
        autoHideDuration={3000}
        onClose={onToastClose}
        message={"Product removed"}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={onUndo}>
              UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={onToastClose}>
              <Close fontSize="small"/>
            </IconButton>
          </React.Fragment>
        }
      />
    </Paper>
  );
}