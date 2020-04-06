import React from 'react';
import { ProductItem } from './ProductItem';
import { ProductTypeVO } from '../../models/ProductTypeVO';
import { action } from '@storybook/addon-actions';


export default { title: 'Product Item' };

let productType: ProductTypeVO = {
  name: 'Kroger Vitamin A & D Reduced Fat 2% Milk',
  price: 10,
  imageUrl: 'https://spoonacular.com/productImages/27693-312x231.jpg',
  categories: ['Snacks']
}

export const normal = () => <ProductItem productType={productType} onQuantityChange={action('onQuantityChange')} />;
