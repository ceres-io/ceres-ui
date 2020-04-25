import React, { FunctionComponent } from 'react';
import Joyride from 'react-joyride';
import { Typography, makeStyles, Theme, createStyles, useTheme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles(
  {
    step: {
      textAlign: 'left'
    }
  }
))

export const ShopJoyride: FunctionComponent = (props) => {

  const classes = useStyles();

  const theme = useTheme();

  const steps = [
    {
      target: '.MuiAutocomplete-root.MuiAutocomplete-hasClearIcon.MuiAutocomplete-hasPopupIcon',
      content: (
        <div className={classes.step}>
          <Typography variant='body1'>
            Ok, let's start by entering a product name in the search box.<br /> <br />
            Search for apple or meat and we'll do our best to help you find what you're looking for.
          </Typography>
        </div>
      ),
      spotlightClicks: true
    },
    {
      target: '.product-item',
      content: (
        <div className={classes.step}>
          <Typography variant='body1'>
            We found a product that matched your search!
          </Typography>
        </div>
      ),
      spotlightClicks: true
    },
    {
      target: '.quantity-actions',
      content: (
        <div className={classes.step}>
          <Typography variant='body1'>
            You can add it or remove it to the cart using these buttons.
          </Typography>
        </div>
      ),
      spotlightClicks: true
    },
    {
      target: '.shopping-cart-item',
      content: (
        <div className={classes.step}>
          <Typography variant='body1'>
            You can view the current groceries in your cart here. For convenience, you can also adjust the quantity of your items from here.
          </Typography>
        </div>
      ),
      spotlightClicks: true,
      spotlightPadding: 20
    },
    {
      target: '.cart-total',
      content: (
        <div className={classes.step}>
          <Typography variant='body1'>
            We keep a running tally of your shopping trip here, to make sure you can easily shop within budget.
          </Typography>
        </div>
      ),
      spotlightClicks: true,
      spotlightPadding: 20
    },
    {
      target: '.checkout-button',
      content: (
        <div className={classes.step}>
          <Typography variant='body1'>
            When you're all finished shopping, just hit checkout!
          </Typography>
        </div>
      ),
      spotlightClicks: true,
      spotlightPadding: 20
    }
  ]


  return (
    <Joyride
      steps={steps}
      styles={{
        options: {
          primaryColor: theme.palette.primary.main
        }
      }}
      run
      showProgress
      continuous
    />
  );
}