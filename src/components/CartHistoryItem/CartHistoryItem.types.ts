import { CartVO } from "../../models/CartVo";

export interface ICartHistoryItemInput {
  cart: CartVO
}

export interface ICartHistoryItemEvent {

}

export type CartHistoryItemProps = ICartHistoryItemInput & ICartHistoryItemEvent