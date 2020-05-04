import produce from 'immer';

import { AddressVO } from '../../models/AddressVO';
import { CreditCardVO } from '../../models/CreditCardVO';
import { CheckoutActions, ActionName, AddressAddedAction, AddressRemovedAction, CardAddedAction, CardRemovedAction, AddressSelectedAction, CardSelectedAction, CheckoutPage } from '../actions/CheckoutAction';

import { remove } from 'lodash';


export interface ICheckoutState {
  cards: CreditCardVO[]
  addresses: AddressVO[]
  zip?: string
  selectedBillingAddress?: AddressVO
  selectedDeliveryAddress?: AddressVO
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
        selectAddress(addressAction.payload.address, addressAction.payload.page, next)
        break;
      }
      case ActionName.AddressRemoved: {
        let addressAction = action as AddressRemovedAction;
        removeAddress(addressAction.payload.address, next.addresses)
        break;
      }
      case ActionName.AddressSelected: {
        let addressAction = action as AddressSelectedAction;
        selectAddress(addressAction.payload.address, addressAction.payload.page, next)
        break;
      }
      case ActionName.CardAdded: {
        let cardAction = action as CardAddedAction;
        addCard(cardAction.payload.card, next.cards)
        next.selectedCard = cardAction.payload.card
        break;
      }
      case ActionName.CardRemoved: {
        let cardAction = action as CardRemovedAction;
        removeCard(cardAction.payload.card, next.cards)
        break;
      }
      case ActionName.CardSelected: {
        let cardAction = action as CardSelectedAction;
        next.selectedCard = cardAction.payload.card
        break;
      }
    }
  })
}

const addAddress = (address: AddressVO, addresses: AddressVO[]) => {
  addresses.push(address);
}

const removeAddress = (address: AddressVO, addresses: AddressVO[]) => {
  remove(addresses, a => a.streetAddress === address.streetAddress)
}

const selectAddress = (address: AddressVO, page: CheckoutPage, state: ICheckoutState) => {
  switch (page) {
    case CheckoutPage.Checkout: {
      state.selectedBillingAddress = address
      if (!state.selectedDeliveryAddress) {
        state.selectedDeliveryAddress = address
      }
      break;
    }
    case CheckoutPage.Delivery: {
      state.selectedDeliveryAddress = address
      break;
    }
  }
}

const addCard = (card: CreditCardVO, cards: CreditCardVO[]) => {
  cards.push(card);
}

const removeCard = (card: CreditCardVO, cards: CreditCardVO[]) => {
  remove(cards, c => c.ccNumber === card.ccNumber)
}