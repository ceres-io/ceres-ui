import { ProductTypeVO } from '../../models/ProductTypeVO';
import { Ref } from 'react';

export enum ProductSearchOptionType {
  Category = 'category',
  Product = 'product'
}

export interface ProductSearchOption {
  group: ProductSearchOptionType
  label: string
  value: string | ProductTypeVO
}

export interface IProductSearchInput {
  availableProducts: ProductTypeVO[];
  inputRef: Ref<HTMLInputElement>;
}

export interface IProductSearchEvent {
  onChange?: (result: ProductTypeVO[]) => void; // found products
}

export type ProductSearchProps = IProductSearchInput & IProductSearchEvent