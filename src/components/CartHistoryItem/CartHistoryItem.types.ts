import { CartVO } from '../../models/CartVO';

export interface ICartHistoryItemInput {
  cart: CartVO
}

export interface ICartHistoryItemEvent {
  onStartFromCartClick?: () => void;
  onOrderAgainClick?: () => void;
}

export type CartHistoryItemProps = ICartHistoryItemInput & ICartHistoryItemEvent