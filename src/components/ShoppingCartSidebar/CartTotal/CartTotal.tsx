import React, { FunctionComponent, useState, useEffect } from 'react';
import { CartTotalProps } from './CartTotal.types';
import { Paper, Box, Divider, Typography, makeStyles, Theme, createStyles, Container } from '@material-ui/core';
import { ProductVO } from '../../../models/ProductVO';
import { formatCurrency } from '../../../utils/currencyUtil';
import { useSelector } from 'react-redux';
import { IApplicationStore } from '../../../redux/store/store.types';

const TAX_PERCENTAGE = 4.3;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      padding: theme.spacing(2)
    },
    row: {
      paddingTop: theme.spacing(1)
    }
  })
);

export const CartTotal: FunctionComponent<CartTotalProps> = (props) => {
  const classes = useStyles();

  const subtotal = useSelector((store: IApplicationStore) => store.ceres.shopping.subtotal);
  const tax = useSelector((store: IApplicationStore) => store.ceres.shopping.tax);
  const total = useSelector((store: IApplicationStore) => store.ceres.shopping.total);

  return (
    <Paper variant='elevation' className='cart-total'>
      <Container className={classes.content}>
        <Box display='flex' flexDirection='column'>
          <Box className={classes.row} display='flex' flexDirection='row'>
            <Box flexGrow={1}>
              <Typography variant='subtitle1'>
                Subtotal
            </Typography>
            </Box>
            <Box alignContent='flex-end'>
              <Typography variant='subtitle1'>
                {formatCurrency(subtotal)}
              </Typography>
            </Box>
          </Box>
          <Box className={classes.row} display='flex' flexDirection='row'>
            <Box flexGrow={1}>
              <Typography variant='subtitle2'>
                Tax
            </Typography>
            </Box>
            <Box alignContent='flex-end'>
              <Typography variant='subtitle2'>
                {formatCurrency(tax)}
              </Typography>
            </Box>
          </Box>

          <div className={classes.row}>
            <Divider />
          </div>

          <Box className={classes.row} display='flex' flexDirection='row'>
            <Box flexGrow={1}>
              <Typography variant='h6'>
                Total
            </Typography>
            </Box>
            <Box alignContent='flex-end'>
              <Typography variant='h6'>
                {formatCurrency(total)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Paper>
  );
}