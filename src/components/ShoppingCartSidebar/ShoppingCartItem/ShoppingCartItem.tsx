import React, { FunctionComponent } from 'react';
import { ShoppingCartItemProps } from './ShoppingCartItem.types';
import { Container, Grid, Typography, IconButton, makeStyles, Box, Theme, createStyles, TableRow, TableCell } from '@material-ui/core';
import { formatCurrency } from '../../../utils/currencyUtil';
import { Add, Remove, Delete } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { ProductIncreaseAction, ProductDecreaseAction, ProductQuantityChangeAction } from '../../../redux/actions/ShoppingAction';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    details: {
      width: 200
    },
    boxItem: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    productDetails: {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'auto',
    },
    quantity: {
      width: '8%'
    },
    button: {
      width: '9%'
    },
  })
);



export const ShoppingCartItem: FunctionComponent<ShoppingCartItemProps> = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const onIncrease = () => {
    dispatch(new ProductIncreaseAction({ productType: props.product.type }))
  }

  const onDecrease = () => {
    dispatch(new ProductDecreaseAction({ productType: props.product.type }))
  }

  const onRemove = () => {
    dispatch(new ProductQuantityChangeAction({ quantity: 0, productType: props.product.type }))
  }

  return (
    <TableRow key={props.product.type.name} className='shopping-cart-item'>
      <TableCell className={classes.quantity}>
        <Typography variant='subtitle2'>
          {props.product.quantity}
        </Typography>
      </TableCell>
      <TableCell className={classes.productDetails}>
        <Grid container direction='column'>
          <Grid item>
            <Typography variant='body1' className={classes.productDetails} noWrap>
              {props.product.type.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='body1'>
              {formatCurrency(props.product.type.price)} / unit
            </Typography>
          </Grid>
        </Grid>
      </TableCell>
      <TableCell className={classes.button}>
        <IconButton onClick={() => onIncrease()}>
          <Add />
        </IconButton>
      </TableCell>
      <TableCell className={classes.button}>
        <IconButton onClick={() => onDecrease()}>
          <Remove />
        </IconButton>
      </TableCell>
      <TableCell className={classes.button}>
        <IconButton onClick={() => onRemove()}>
          <Delete />
        </IconButton>
      </TableCell >
    </TableRow >
  );
}