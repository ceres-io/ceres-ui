import React, { FunctionComponent, useState, useEffect } from 'react';
import { CartTotalProps } from './CartTotal.types';
import { Paper, Box, Divider, Typography, makeStyles, Theme, createStyles, Container } from '@material-ui/core';
import { ProductVO } from '../../../models/ProductVO';

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

  const calculateSubtotal = (products: ProductVO[]): number => {
    return products.reduce((subtotal, p) => subtotal + p.type.price, 0)
  }

  const [subtotal, setSubtotal] = useState(calculateSubtotal(props.products));

  // Re-calculate subtotal when products are changed
  useEffect(() => {
    setSubtotal(calculateSubtotal(props.products))
  }, [props.products])

  const calculateTax = (): number => {
    return subtotal * (TAX_PERCENTAGE / 100);
  }

  return (
    <Paper variant='elevation'>
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
                ${subtotal}
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
                ${calculateTax()}
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
                ${subtotal + calculateTax()}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Paper>
  );
}