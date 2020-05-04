import React from 'react';
import { ShoppingCartSidebar } from './ShoppingCartSidebar';
import { ProductVO } from '../../models/ProductVO';
import { ProductTypeVO } from '../../models/ProductTypeVO';


export default { title: 'Shopping Cart Sidebar' };

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
    imageUrl: '',
    categories: ['Dairy']
  },
  {
    id: 2,
    name: 'Milk',
    price: 6,
    imageUrl: '',
    categories: ['Dairy', 'Cow']
  },
  {
    id: 3,
    name: 'Pizza',
    price: 6,
    imageUrl: '',
    categories: ['Dairy', 'Cow']
  },
]

let mockProducts: ProductVO[] = mockProductTypes.map(pt => ({ quantity: 0, type: pt }))
mockProducts = mockProducts.concat(mockProducts).concat(mockProducts)

export const normal = () => <ShoppingCartSidebar showCheckoutButton />