import produce from 'immer';
import { ProductVO } from '../../models/ProductVO';
import {
  ShoppingActions,
  ActionName,
  ProductDecreaseAction,
  ProductIncreaseAction,
  ProductQuantityChangeAction
} from '../actions/ShoppingAction';
import { ProductTypeVO } from '../../models/ProductTypeVO';
import { remove } from 'lodash';

const TAX_PERCENTAGE = 4.3;

export interface IShoppingState {
  products: ProductVO[]
  subtotal: number
  tax: number
  total: number
  dory?: ProductVO // you know... the fish
}

const initialShoppingState: IShoppingState = {
  products: [],
  subtotal: 0,
  tax: 0,
  total: 0
}

export const shoppingReducer = (state: IShoppingState = initialShoppingState, action: ShoppingActions): IShoppingState => {
  return produce(state, next => {
    switch (action.type) {
      case ActionName.ProductIncrease: {
        let increaseAction = action as ProductIncreaseAction;
        increaseProduct(increaseAction.payload.productType, next.products)
        break;
      }
      case ActionName.ProductDecrease: {
        let decreaseAction = action as ProductDecreaseAction;
        decreaseProduct(decreaseAction.payload.productType, next.products)
        updateShortTermMemoryIfDeleted(state.products, decreaseAction.payload.productType, next)
        break;
      }
      case ActionName.ProductQuantity: {
        let quantityAction = action as ProductQuantityChangeAction;
        updateProductQuantity(quantityAction.payload.quantity, quantityAction.payload.productType, next.products)
        if(quantityAction.payload.quantity == 0) {
          // we've completely removed the item
          updateShortTermMemory(state.products, quantityAction.payload.productType, next)
        }
        break;
      }
      case ActionName.ProductUndo: {
        if(state.dory !== undefined) {
          updateProductQuantity(state.dory.quantity, state.dory.type, next.products)
        }
        next.dory = undefined;
        break;
      }
      case ActionName.ProductUndoExpiration: {
        next.dory = undefined
        break;
      }
    }
    removeZeroQuantityProducts(next.products)
    next.subtotal = calculateSubtotal(next.products)
    next.tax = calculateTax(next.subtotal)
    next.total = next.subtotal + next.tax
  })
}

const increaseProduct = (productType: ProductTypeVO, products: ProductVO[]) => {
  let product = products.find(p => p.type.id === productType.id)

  if (product) {
    product.quantity++
  }
  else {
    products.push({ quantity: 1, type: productType })
  }
}

const decreaseProduct = (productType: ProductTypeVO, products: ProductVO[]) => {
  let product = products.find(p => p.type.id === productType.id)

  if (product) {
    product.quantity--
  }
}

const updateProductQuantity = (quantity: number, productType: ProductTypeVO, products: ProductVO[]) => {
  let product = products.find(p => p.type.id === productType.id)

  if (product) {
    product.quantity = quantity
  }
  else {
    products.push({ quantity: quantity, type: productType })
  }
}

function updateShortTermMemory(products: ProductVO[], productType: ProductTypeVO, next: IShoppingState) {
  let product = products.find(p => p.type.id === productType.id)
  if(product) {
    next.dory = product // Probably redundant, since product is already "nullable"
  }
}

function updateShortTermMemoryIfDeleted(originalProducts: ProductVO[], productType: ProductTypeVO, next: IShoppingState) {
  let product = originalProducts.find(p => p.type.id === productType.id)
  if(product && product.quantity == 1) {
    next.dory = product
  }
}

const removeZeroQuantityProducts = (products: ProductVO[]) => {
  remove(products, p => p.quantity === 0)
}

const calculateSubtotal = (products: ProductVO[]): number => {
  return products.reduce((subtotal, p) => subtotal + (p.quantity * p.type.price), 0)
}


const calculateTax = (subtotal: number): number => {
  return subtotal * (TAX_PERCENTAGE / 100);
}