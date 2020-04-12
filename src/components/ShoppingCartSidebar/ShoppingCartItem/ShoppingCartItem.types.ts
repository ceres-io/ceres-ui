import { ProductVO } from '../../../models/ProductVO';


export interface IShoppingCartItemInput {
  product: ProductVO
}


export interface IShoppingCartItemEvent {
  onQuantityChange?: (quantity: number) => void;
  onRemove?: () => void;
}


export type ShoppingCartItemProps = IShoppingCartItemInput & IShoppingCartItemEvent