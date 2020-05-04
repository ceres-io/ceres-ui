import { ProductVO } from '../../models/ProductVO';


export interface IShoppingCartSidebartInput {
  showCheckoutButton: boolean
}


export interface IShoppingCartSidebartEvent {
  onCheckout?: () => void;
}


export type ShoppingCartSidebarProps = IShoppingCartSidebartInput & IShoppingCartSidebartEvent