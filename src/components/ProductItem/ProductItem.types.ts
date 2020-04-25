import { ProductTypeVO } from '../../models/ProductTypeVO';

// TODO - needs to be changed to take productVO
export interface IProductItemInput {
  productType: ProductTypeVO;
  quantity?: number; // TODO - quantity will be controlled/stored in redux state
}

export interface IProductItemEvent {
  onQuantityChange?: (quantity: number) => void;
}

export type ProductItemProps = IProductItemInput & IProductItemEvent