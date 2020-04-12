import { ProductVO } from '../../models/ProductVO';


export interface IShoppingCartSidebartInput {
  selectedProducts: ProductVO[]
}


export interface IShoppingCartSidebartEvent {
  onCheckout?: () => void;
}


export type ShoppingCartSidebarProps = IShoppingCartSidebartInput & IShoppingCartSidebartEvent