import React from 'react';
import { ShoppingCartItem } from './ShoppingCartItem';
import { ProductTypeVO } from '../../../models/ProductTypeVO';

export default { title: 'Shopping Cart Sidebar/Shopping Cart Item' };


let krogerMilk: ProductTypeVO = {
  name: 'Kroger Vitamin A & D Reduced Fat 2% Milk',
  price: 10,
  imageUrl: 'https://spoonacular.com/productImages/27693-312x231.jpg',
  categories: ['Diary']
}

let pizza: ProductTypeVO = {
  name: 'Uno Frozen Pizza',
  price: 6,
  imageUrl: '',
  categories: ['Pizza']
}

export const normal = () => <ShoppingCartItem product={{ type: pizza, quantity: 1 }} />;

export const longProductName = () => <ShoppingCartItem product={{ type: krogerMilk, quantity: 2 }} />;