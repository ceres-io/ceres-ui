import { ProductVO } from '../../../models/ProductVO';


export interface IShoppingCartItemInput {
  product: ProductVO
}


export interface IShoppingCartItemEvent {

}


export type ShoppingCartItemProps = IShoppingCartItemInput & IShoppingCartItemEvent