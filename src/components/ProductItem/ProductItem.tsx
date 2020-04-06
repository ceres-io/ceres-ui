import React, { ChangeEvent, FocusEvent } from 'react';
import { ProductItemProps } from './ProductItem.types';
import { Card, makeStyles, CardMedia, Typography, CardContent, CardActions, ButtonGroup, Button, IconButton, TextField, Chip, Grid, Container } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    // height: 324
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
  productTypes: {
    paddingTop: 10,
    paddingBottom: 10
  }
})

export const ProductItem: React.FunctionComponent<ProductItemProps> = (props) => {
  const classes = useStyles();

  const onIncrease = () => {
    // TODO - fire props onIncrease
  }

  const onDecrease = () => {
    // TODO - fire props onDecrease
  }

  const onQuantityInputFinished = (event: FocusEvent<HTMLInputElement>) => {
    // TODO - fire props onQuantityChange
    console.log(event.currentTarget.value)
  }

  return (
    <Card className={classes.root}>

      <img className={classes.image} src='https://spoonacular.com/productImages/27693-312x231.jpg' />

      <CardContent>
        <Container className={classes.productTypes}>
          <Chip label='Snacks' size='small' variant='outlined' />
        </Container>
        <Typography variant='subtitle1' className={classes.name} align='center'>
          {'Kroger Vitamin A & D Reduced Fat 2% Milk'}
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
            $10.00
        </Typography>
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
        </Grid>
      </CardActions>
    </Card >
  );
}