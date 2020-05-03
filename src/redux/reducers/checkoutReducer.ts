import produce from 'immer';

import { AddressVO } from '../../models/AddressVO';
import { CreditCardVO } from '../../models/CreditCardVO';
import { CheckoutActions, ActionName, AddressAddedAction, AddressRemovedAction, CardAddedAction, CardRemovedAction } from '../actions/CheckoutAction';

import { remove } from 'lodash';


export interface ICheckoutState {
  cards: CreditCardVO[]
  addresses: AddressVO[]
  zip?: string
  selectedBillingAddress?: AddressVO
  selectedCard?: CreditCardVO
}

const initialCheckoutState: ICheckoutState = {
  cards: [],
  addresses: []
}

export const checkoutReducer = (state: ICheckoutState = initialCheckoutState, action: CheckoutActions) => {
  return produce(state, next => {
    switch (action.type) {
      case ActionName.AddressAdded: {
        let addressAction = action as AddressAddedAction;
        addAddress(addressAction.payload.address, next.addresses)
        break;
      }
      case ActionName.AddressRemoved: {
        let addressAction = action as AddressRemovedAction;
        removeAddress(addressAction.payload.address, next.addresses)
        break;
      }
      case ActionName.CardAdded: {
        let cardAction = action as CardAddedAction;
        addCard(cardAction.payload.card, next.cards)
        break;
      }
      case ActionName.CardRemoved: {
        let cardAction = action as CardRemovedAction;
        removeCard(cardAction.payload.card, next.cards)
        break;
      }
    }
  })
}

const addAddress = (address: AddressVO, addresses: AddressVO[]) => {
  addresses.push(address);
}

const removeAddress = (address: AddressVO, addresses: AddressVO[]) => {
  remove(addresses, a => a.id === address.id)
}

const addCard = (card: CreditCardVO, cards: CreditCardVO[]) => {
  cards.push(card);
}

const removeCard = (card: CreditCardVO, cards: CreditCardVO[]) => {
  remove(cards, c => c.ccNumber === card.ccNumber)
}