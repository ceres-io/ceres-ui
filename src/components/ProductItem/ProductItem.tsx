import React, { FunctionComponent, FocusEvent } from 'react';
import { ProductItemProps } from './ProductItem.types';
import { Card, makeStyles, CardMedia, Typography, CardContent, CardActions, ButtonGroup, Button, IconButton, TextField, Chip, Grid, Container } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import { CategoryBar } from './CategoryBar/CategoryBar';
import { formatCurrency } from '../../utils/currencyUtil';
import { useDispatch } from 'react-redux';
import { ProductIncreaseAction, ProductDecreaseAction, ProductQuantityChangeAction } from '../../redux/actions/ShoppingAction';

const useStyles = makeStyles({
  root: {
    width: 300,
    height: 400
  },
  image: {
    // height: 162
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  name: {
    lineHeight: 1
  },
  actionGrid: {
    paddingLeft: 20,
    paddingRight: 20
  },
  numberInput: {
    maxWidth: 75
  },
})



export const ProductItem: FunctionComponent<ProductItemProps> = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const onIncrease = () => {
    // if (props.onQuantityChange) {
    //   let quantity: number = props.quantity ? props.quantity + 1 : 1
    //   props.onQuantityChange(quantity)
    // }

    dispatch(new ProductIncreaseAction({ productType: props.productType }))
  }

  const onDecrease = () => {
    // if (props.onQuantityChange) {
    //   let quantity: number = props.quantity ? props.quantity - 1 : 0
    //   props.onQuantityChange(quantity)
    // }

    dispatch(new ProductDecreaseAction({ productType: props.productType }))
  }

  const onQuantityInputFinished = (event: FocusEvent<HTMLInputElement>) => {
    // if (props.onQuantityChange) {
    //   let quantity: number = parseInt(event.target.value)
    //   props.onQuantityChange(quantity)
    // }

    let quantity: number = parseInt(event.target.value)
    dispatch(new ProductQuantityChangeAction({ quantity, productType: props.productType }))
  }

  return (
    <Card className={classes.root}>

      <img className={classes.image} src={props.productType.imageUrl} />

      <CardContent>
        <CategoryBar categories={props.productType.categories} />
        <Typography variant='subtitle1' className={classes.name} align='center'>
          {props.productType.name}
        </Typography>
      </CardContent>

      <CardActions>
        <Grid container
          spacing={2}
          className={classes.actionGrid}
          justify='center'
          alignContent='center'
          alignItems='center'
        >
          <Typography variant='body1'>
            {formatCurrency(props.productType.price)}
          </Typography>
          <div className='quantity-actions'>
            <IconButton onClick={onIncrease}>
              <Add />
            </IconButton>
            <TextField
              className={classes.numberInput}
              onBlur={onQuantityInputFinished}
              type='number'
              label='qty'
              variant='outlined'
            />
            <IconButton onClick={onDecrease}>
              <Remove />
            </IconButton>
          </div>
        </Grid>
      </CardActions>
    </Card >
  );
}