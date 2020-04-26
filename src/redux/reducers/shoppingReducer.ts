import produce from 'immer';
import { ProductVO } from '../../models/ProductVO';
import { ShoppingActions, ActionName, ProductDecreaseAction, ProductIncreaseAction, ProductQuantityChangeAction } from '../actions/ShoppingAction';
import { ProductTypeVO } from '../../models/ProductTypeVO';
import { remove } from 'lodash';

const TAX_PERCENTAGE = 4.3;

export interface IShoppingState {
  products: ProductVO[]
  subtotal: number
  tax: number
  total: number
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
        break;
      }
      case ActionName.ProductQuantity: {
        let quantityAction = action as ProductQuantityChangeAction;
        updateProductQuantity(quantityAction.payload.quantity, quantityAction.payload.productType, next.products)
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

const removeZeroQuantityProducts = (products: ProductVO[]) => {
  remove(products, p => p.quantity === 0)
}

const calculateSubtotal = (products: ProductVO[]): number => {
  return products.reduce((subtotal, p) => subtotal + (p.quantity * p.type.price), 0)
}


const calculateTax = (subtotal: number): number => {
  return subtotal * (TAX_PERCENTAGE / 100);
}