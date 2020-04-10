import React from 'react';
import { ProductTypeVO } from '../../models/ProductTypeVO';
import { ProductSearch } from './ProductSearch';
import { action } from '@storybook/addon-actions';



export default { title: 'Product Search' };

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
    imageUrl: '',
    categories: ['Dairy']
  },
  {
    name: 'Milk',
    price: 6,
    imageUrl: '',
    categories: ['Dairy', 'Cow']
  },
  {
    name: 'Pizza',
    price: 6,
    imageUrl: '',
    categories: ['Dairy', 'Cow']
  },
]

export const normal = () => <ProductSearch availableProducts={mockProductTypes} onChange={action('onChange')} />