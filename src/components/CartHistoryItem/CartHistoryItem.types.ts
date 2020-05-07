import { CartVO } from '../../models/CartVO';

export interface ICartHistoryItemInput {
  cart: CartVO
}

export interface ICartHistoryItemEvent {

}

export type CartHistoryItemProps = ICartHistoryItemInput & ICartHistoryItemEvent