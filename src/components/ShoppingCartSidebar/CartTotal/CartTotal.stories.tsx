import React from 'react';
import { ProductTypeVO } from '../../../models/ProductTypeVO';
import { ProductVO } from '../../../models/ProductVO';
import { CartTotal } from './CartTotal';

export default { title: 'Shopping Cart Sidebar/Cart Total' };


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

let products: ProductVO[] = [{ type: krogerMilk, quantity: 2 }, { type: pizza, quantity: 1 }]

export const normal = () => <CartTotal products={products} />;
