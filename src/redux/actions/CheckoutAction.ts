import { Action } from 'redux';
import { AddressVO } from '../../models/AddressVO';
import { CreditCardVO } from '../../models/CreditCardVO';

export enum ActionName {
  AddressAdded = '@Checkout/address/added',
  AddressRemoved = '@Checkout/address/removed',
  AddressSelected = '@Checkout/address/selected',
  CardAdded = '@Checkout/card/added',
  CardRemoved = '@Checkout/card/removed',
  CardSelected = '@Checkout/card/selected'
}

export enum CheckoutPage {
  Checkout = 'checkout',
  Delivery = 'delivery'
}

export interface IAddressPayload {
  address: AddressVO
  page: CheckoutPage
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

export class AddressSelectedAction implements Action<ActionName> {
  type = ActionName.AddressSelected;
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

export class CardSelectedAction implements Action<ActionName> {
  type = ActionName.CardSelected;
  constructor(public payload: ICardPayload) {
  }
}

export type CheckoutActions =
  AddressAddedAction |
  AddressRemovedAction |
  CardSelectedAction |
  CardAddedAction |
  CardRemovedAction |
  CardSelectedAction;