import React from 'react';
import { ProductList } from './ProductList';
import { ProductTypeVO } from '../../models/ProductTypeVO';
import { action } from '@storybook/addon-actions';

export default { title: 'Product List' };

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
let duplicatedProducts = [...mockProductTypes, ...mockProductTypes, ...mockProductTypes, ...mockProductTypes, ...mockProductTypes, ...mockProductTypes, ...mockProductTypes, ...mockProductTypes, ...mockProductTypes]

export const normal = () => <ProductList products={duplicatedProducts} onRefineSearch={action('onRefine')} />

export const smallList = () => <ProductList products={mockProductTypes} onRefineSearch={action('onRefine')} />