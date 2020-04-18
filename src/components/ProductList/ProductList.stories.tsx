import React from 'react';
import { ProductList } from './ProductList';
import { ProductTypeVO } from '../../models/ProductTypeVO';

export default { title: 'Product List' };

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
let duplicatedProducts = [...mockProductTypes, ...mockProductTypes, ...mockProductTypes, ...mockProductTypes, ...mockProductTypes, ...mockProductTypes, ...mockProductTypes, ...mockProductTypes, ...mockProductTypes]

export const normal = () => <ProductList products={duplicatedProducts} />