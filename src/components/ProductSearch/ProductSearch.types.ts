import { ProductTypeVO } from '../../models/ProductTypeVO';

export interface IProductSearchInput {
  availableProducts: ProductTypeVO[];
}

export interface IProductSearchEvent {
  onChange?: (result: ProductTypeVO[]) => void; // found products
}

export type ProductSearchProps = IProductSearchInput & IProductSearchEvent