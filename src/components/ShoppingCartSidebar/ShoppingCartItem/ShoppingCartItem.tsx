import React, { FunctionComponent } from 'react';
import { ShoppingCartItemProps } from './ShoppingCartItem.types';
import { Container, Grid, Typography, IconButton, makeStyles, Box, Theme, createStyles, TableRow, TableCell } from '@material-ui/core';

import { Add, Remove, Delete } from '@material-ui/icons';

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
      width: '13%'
    },
  })
);

export const ShoppingCartItem: FunctionComponent<ShoppingCartItemProps> = (props) => {
  const classes = useStyles();

  return (
    <TableRow key={props.product.type.name}>
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
              {props.product.type.price}
            </Typography>
          </Grid>
        </Grid>
      </TableCell>
      <TableCell className={classes.button}>
        <IconButton>
          <Add />
        </IconButton>
      </TableCell>
      <TableCell className={classes.button}>
        <IconButton>
          <Remove />
        </IconButton>
      </TableCell>
      <TableCell className={classes.button}>
        <IconButton>
          <Delete />
        </IconButton>
      </TableCell >
    </TableRow >
  );
}