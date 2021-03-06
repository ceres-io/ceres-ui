import React, { FunctionComponent, FocusEvent, ChangeEvent } from 'react';
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
    display: 'block',
    margin: 'auto'
  },
  imageDiv: {
    height: 230
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
    dispatch(new ProductIncreaseAction({ productType: props.productType }))
  }

  const onDecrease = () => {
    dispatch(new ProductDecreaseAction({ productType: props.productType }))
  }

  const onQuantityInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      let quantity: number = parseInt(event.target.value)
      dispatch(new ProductQuantityChangeAction({ quantity, productType: props.productType }))
    }
    else {
      dispatch(new ProductQuantityChangeAction({ quantity: 0, productType: props.productType }))
    }
  }

  return (
    <Card className={classes.root}>
      <div className={classes.imageDiv}>
        <img className={classes.image} src={props.productType.imageUrl} />
      </div>

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
              value={props.quantity || ''}
              className={classes.numberInput}
              onChange={onQuantityInputChange}
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