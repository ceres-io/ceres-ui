import { Action } from 'redux';
import { ProductTypeVO } from '../../models/ProductTypeVO';

export enum ActionName {
  ProductIncrease = '@Shopping/product/increase',
  ProductDecrease = '@Shopping/product/decrease',
  ProductQuantity = '@Shopping/product/quantity',
  ProductUndo = '@Shopping/product/undo',
  ProductUndoExpiration = '@Shopping/product/undo/expire'
}

export interface IProductIncreasePayload {
  productType: ProductTypeVO
}

export class ProductIncreaseAction implements Action<ActionName> {
  type = ActionName.ProductIncrease
  constructor(public payload: IProductIncreasePayload) {
  }
}

export interface IProductDecreasePayload {
  productType: ProductTypeVO
}

export class ProductDecreaseAction implements Action<ActionName> {
  type = ActionName.ProductDecrease
  constructor(public payload: IProductDecreasePayload) {
  }
}

export interface IProductQuantityChangePayload {
  productType: ProductTypeVO
  quantity: number
}

export class ProductQuantityChangeAction implements Action<ActionName> {
  type = ActionName.ProductQuantity
  constructor(public payload: IProductQuantityChangePayload) {
  }
}

export class ProductDeletionUndoAction implements Action<ActionName> {
  type = ActionName.ProductUndo
  constructor() {
  }
}

export class ProductDeletionUndoExpirationAction implements Action<ActionName> {
  type = ActionName.ProductUndoExpiration
  constructor() { // Do I need this? IDK
  }
}

export type ShoppingActions = ProductIncreaseAction | ProductDecreaseAction | ProductQuantityChangeAction |
    ProductDeletionUndoAction | ProductDeletionUndoExpirationAction;