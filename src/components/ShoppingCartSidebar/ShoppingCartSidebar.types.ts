import { ProductVO } from '../../models/ProductVO';


export interface IShoppingCartSidebartInput {
  selectedProducts: ProductVO[]
}


export interface IShoppingCartSidebartEvent {

}


export type ShoppingCartSidebarProps = IShoppingCartSidebartInput & IShoppingCartSidebartEvent