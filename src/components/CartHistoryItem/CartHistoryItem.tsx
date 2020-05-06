import React, { FunctionComponent } from 'react';
import { CartHistoryItemProps } from './CartHistoryItem.types';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@material-ui/core';
import { ProductVO } from '../../models/ProductVO';


export const PRODUCT_COLUMNS = 3;

export const CartHistoryItem: FunctionComponent<CartHistoryItemProps> = (props) => {


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
    return props.cart.products.reduce((subtotal, p) => subtotal + (p.quantity * p.type.price), 0)
  }

  const getAddress = (): string => {
    let address = props.cart.deliveryAddress
    return `${address.streetAddress}, ${address.city} ${address.state}, ${address.zip}`
  }

  const getDateString = (): string => {
    return props.cart.date.toDateString()
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
              <TableCell><Button variant='contained' color='primary'>Order Again</Button></TableCell>
              <TableCell><Button variant='contained' color='secondary'>Fill New Cart</Button></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{getDateString()}</TableCell>
              <TableCell>${calculateTotal()}</TableCell>
              <TableCell>{getAddress()}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table size='small'>
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