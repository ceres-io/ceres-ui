import { Action } from 'redux';
import { AddressVO } from '../../models/AddressVO';
import { CreditCardVO } from '../../models/CreditCardVO';

export enum ActionName {
  AddressAdded = '@Checkout/address/added',
  AddressRemoved = '@Checkout/address/removed',
  CardAdded = '@Checkout/card/added',
  CardRemoved = '@Checkout/card/removed'
}

export interface IAddressPayload {
  address: AddressVO
}

export class AddressAddedAction implements Action<ActionName> {
  type = ActionName.AddressAdded;
  constructor(public payload: IAddressPayload) {
  }
}

export class AddressRemovedAction implements Action<ActionName> {
  type = ActionName.AddressRemoved;
  constructor(public payload: IAddressPayload) {
  }
}

export interface ICardPayload {
  card: CreditCardVO
}

export class CardAddedAction implements Action<ActionName> {
  type = ActionName.CardAdded;
  constructor(public payload: ICardPayload) {
  }
}

export class CardRemovedAction implements Action<ActionName> {
  type = ActionName.CardRemoved;
  constructor(public payload: ICardPayload) {
  }
}

export type CheckoutActions = AddressAddedAction | AddressRemovedAction | CardAddedAction | CardRemovedAction;