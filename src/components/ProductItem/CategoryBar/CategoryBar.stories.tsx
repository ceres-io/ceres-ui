import React from 'react';
import { CategoryBar } from './CategoryBar';

export default { title: 'Product Item/Categories Bar' };

let categories: string[] = ['Snacks', 'Pizza', 'Junk Food']


export const normal = () => <CategoryBar categories={categories} />