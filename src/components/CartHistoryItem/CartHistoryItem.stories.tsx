import React from 'react';
import { CartHistoryItem } from './CartHistoryItem';
import { ProductTypeVO } from '../../models/ProductTypeVO';
import { CartVO } from '../../models/CartVO';
import { ProductVO } from '../../models/ProductVO';
import { AddressVO } from '../../models/AddressVO';


export default { title: 'Cart History' };

let mockProductTypes: ProductTypeVO[] = [
  {
    id: 0,
    name: 'Kroger Vitamin A & D Reduced Fat 2% Milk',
    price: 10,
    imageUrl: 'https://spoonacular.com/productImages/27693-312x231.jpg',
    categories: ['Snacks', 'Pizza', 'Junk Food']
  },
  {
    id: 1,
    name: 'Eggs',
    price: 2,
    imageUrl: 'https://spoonacular.com/productImages/27693-312x231.jpg',
    categories: ['Dairy']
  },
  {
    id: 2,
    name: 'Milk',
    price: 6,
    imageUrl: 'https://spoonacular.com/productImages/27693-312x231.jpg',
    categories: ['Dairy', 'Cow']
  },
  {
    id: 3,
    name: 'Pizza',
    price: 6,
    imageUrl: 'https://spoonacular.com/productImages/27693-312x231.jpg',
    categories: ['Dairy', 'Cow']
  },
]
// let duplicatedProducts = [...mockProductTypes, ...mockProductTypes, ...mockProductTypes, ...mockProductTypes, ...mockProductTypes, ...mockProductTypes, ...mockProductTypes, ...mockProductTypes, ...mockProductTypes]
let duplicatedProducts = [...mockProductTypes, ...mockProductTypes, ...mockProductTypes]

let products: ProductVO[] = duplicatedProducts.map(pt => ({ quantity: Math.floor(Math.random() * 10), type: pt }))

let address: AddressVO = { name: 'test', streetAddress: '1234 Fake Address Ln', city: 'Alexandria', state: 'VA', zip: '22310' }

let cart: CartVO = { date: new Date(2020, 3, 20), deliveryAddress: address, products }

export const normal = () => <CartHistoryItem cart={cart} />