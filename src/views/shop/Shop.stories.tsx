import React from 'react';
import { ProductTypeVO } from '../../models/ProductTypeVO';
import { Shop } from './Shop';
import { ProductVO } from '../../models/ProductVO';
import products from '../../resources/products.json';


export default { title: 'Shop' };

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


// let products: ProductVO[] = mockProductTypes.map(pt => ({ quantity: Math.floor(Math.random() * 10), type: pt }))

// let mockProductTypes: ProductTypeVO[] = loadAvailableProducts().then(products => { return products })



export const normal = () => <div style={{ background: 'white' }}><Shop /></div>