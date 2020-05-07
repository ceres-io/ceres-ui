import React, { FunctionComponent } from 'react';
import { CartHistoryItemProps } from './CartHistoryItem.types';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button, makeStyles, Theme, createStyles, Divider } from '@material-ui/core';
import { ProductVO } from '../../models/ProductVO';
import { formatCurrency } from '../../utils/currencyUtil';


const useStyles = makeStyles((theme: Theme) => createStyles(
  {
    noBottomBorder: {
      borderBottom: 'none'
    },
    productTable: {
      // marginTop: theme.spacing(1)
    }
  }
))

export const PRODUCT_COLUMNS = 3;

export const CartHistoryItem: FunctionComponent<CartHistoryItemProps> = (props) => {

  const classes = useStyles();

  const getRows = (): ProductVO[][] => {
    let allRows: ProductVO[][] = []

    const numRows = props.cart.products.length / PRODUCT_COLUMNS;

    for (var i = 0; i < numRows; i++) {
      const start = i * PRODUCT_COLUMNS;
      const end = start + PRODUCT_COLUMNS;
      let row: ProductVO[] = props.cart.products.slice(i * PRODUCT_COLUMNS, end)
      allRows.push(row)
    }

    return allRows
  }

  const calculateTotal = (): number => {
    return props.cart.products.reduce((subtotal: number, p) => subtotal + (p.quantity * p.type.price), 0)
  }

  const getAddress = (): string => {
    let address = props.cart.deliveryAddress
    return `${address.streetAddress}, ${address.city} ${address.state}, ${address.zip}`
  }

  const getDateString = (): string => {
    return props.cart.date.toDateString()
  }

  const onOrderAgainClick = () => {
    if (props.onOrderAgainClick) {
      props.onOrderAgainClick()
    }
  }

  const onStartFromCartClick = () => {
    if (props.onStartFromCartClick) {
      props.onStartFromCartClick()
    }
  }

  return (
    <Paper elevation={2}>
      <TableContainer>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Order Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Delivery Details</TableCell>
              <TableCell><Button variant='contained' color='primary' onClick={onOrderAgainClick}>Order Again</Button></TableCell>
              <TableCell><Button variant='contained' color='secondary' onClick={onStartFromCartClick}>Start From Cart</Button></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow >
              <TableCell className={classes.noBottomBorder}>{getDateString()}</TableCell>
              <TableCell className={classes.noBottomBorder}>{formatCurrency(calculateTotal())}</TableCell>
              <TableCell className={classes.noBottomBorder}>{getAddress()}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Divider />

        <Table size='small' className={classes.productTable}>
          <TableBody>
            {getRows().map(r =>
              <TableRow>
                {r.map(p => <TableCell>{p.type.name} ({p.quantity})</TableCell>)}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}