import React from 'react';
import { CartHistoryItem } from './CartHistoryItem';
import { ProductTypeVO } from '../../models/ProductTypeVO';
import { CartVO } from '../../models/CartVO';
import { ProductVO } from '../../models/ProductVO';


export default { title: 'Cart History' };

let mockProductTypes: ProductTypeVO[] = [
  {
    name: 'Kroger Vitamin A & D Reduced Fat 2% Milk',
    price: 10,
    imageUrl: 'https://spoonacular.com/productImages/27693-312x231.jpg',
    categories: ['Snacks', 'Pizza', 'Junk Food']
  },
  {
    name: 'Eggs',
    price: 2,
    imageUrl: 'https://spoonacular.com/productImages/27693-312x231.jpg',
    categories: ['Dairy']
  },
  {
    name: 'Milk',
    price: 6,
    imageUrl: 'https://spoonacular.com/productImages/27693-312x231.jpg',
    categories: ['Dairy', 'Cow']
  },
  {
    name: 'Pizza',
    price: 6,
    imageUrl: 'https://spoonacular.com/productImages/27693-312x231.jpg',
    categories: ['Dairy', 'Cow']
  },
]
// let duplicatedProducts = [...mockProductTypes, ...mockProductTypes, ...mockProductTypes, ...mockProductTypes, ...mockProductTypes, ...mockProductTypes, ...mockProductTypes, ...mockProductTypes, ...mockProductTypes]
let duplicatedProducts = [...mockProductTypes, ...mockProductTypes, ...mockProductTypes]

let products: ProductVO[] = duplicatedProducts.map(pt => ({ quantity: Math.floor(Math.random() * 10), type: pt }))

let cart: CartVO = { products }

export const normal = () => <CartHistoryItem cart={cart} />