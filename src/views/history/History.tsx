import React, { FunctionComponent } from 'react';
import { Button, Box, makeStyles, Theme, createStyles, Typography, Container } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { HistoryProps } from './History.types';
import products from '../../resources/products.json';
import { CartVO } from '../../models/CartVO';
import { ProductVO } from '../../models/ProductVO';
import { AddressVO } from '../../models/AddressVO';
import faker from 'faker';
import { CartHistoryItem } from '../../components/CartHistoryItem/CartHistoryItem';
import { useSelector, useDispatch } from 'react-redux';
import { IApplicationStore } from '../../redux/store/store.types';
import { useRouter } from 'react-router5';
import { RouteNames } from '../../routes/routes';
import { CartProductOverrideAction } from '../../redux/actions/ShoppingAction';

const availableProducts = products.products.filter(p => p.imageUrl).slice(0, 200)

const useStyles = makeStyles((theme: Theme) => createStyles(
  {
    item: {
      marginTop: theme.spacing(4)
    },
    cartItem: {
      marginTop: theme.spacing(2)
    }
  }
))

const getRandomProducts = (): ProductVO[] => {
  return availableProducts.sort(() => 0.5 - Math.random()).slice(0, Math.ceil(Math.random() * 5)).map(pt => ({ quantity: Math.ceil(Math.random() * 10), type: pt }))
}

const getRandomAddress = (): AddressVO => {
  return {
    name: 'fake',
    streetAddress: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    zip: faker.address.zipCode()
  }
}

const getFakeCarts = (): CartVO[] => {
  return [
    {
      date: faker.date.recent(),
      products: getRandomProducts(),
      deliveryAddress: getRandomAddress()
    }
  ]
}

export const History: FunctionComponent<HistoryProps> = () => {

  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const username = useSelector((store: IApplicationStore) => store.ceres.account.username)

  const onStartNewCartClick = () => {
    // Clear out any previous products (new cart)
    dispatch(new CartProductOverrideAction({ products: [] }))
    router.navigate(RouteNames.Shop);
  }

  const onStartFromCartClick = (cart: CartVO) => {
    dispatch(new CartProductOverrideAction({ products: cart.products }))
    router.navigate(RouteNames.Shop);
  }

  const onOrderAgainClick = (cart: CartVO) => {
    dispatch(new CartProductOverrideAction({ products: cart.products }));
    router.navigate(RouteNames.Track);
  }


  return (
    <Container>
      <Box flexDirection='column'>
        <Box className={classes.item}>
          <Typography variant='h4'>
            Welcome back, {username}!
          </Typography>
        </Box>

        <Box className={classes.item}>
          <Button
            variant='contained'
            color='primary'
            onClick={onStartNewCartClick}
          >
            Start a New Cart
          </Button>
        </Box>

        <Box className={classes.item}>
          <Typography variant='h5'>
            Your past carts <ShoppingCartIcon />
          </Typography>
        </Box>

        {
          getFakeCarts().map(c =>
            <Box className={classes.cartItem}>
              <CartHistoryItem
                cart={c}
                onStartFromCartClick={() => onStartFromCartClick(c)}
                onOrderAgainClick={() => onOrderAgainClick(c)}
              />
            </Box>
          )
        }
      </Box>
    </Container>
  )
}