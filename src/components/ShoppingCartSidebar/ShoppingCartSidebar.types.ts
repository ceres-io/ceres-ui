import { ProductVO } from '../../models/ProductVO';


export interface IShoppingCartSidebartInput {
}


export interface IShoppingCartSidebartEvent {
  onCheckout?: () => void;
}


export type ShoppingCartSidebarProps = IShoppingCartSidebartInput & IShoppingCartSidebartEvent