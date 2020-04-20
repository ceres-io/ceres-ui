import { ProductTypeVO } from '../../models/ProductTypeVO';

export interface IShopInput {
  productTypes: ProductTypeVO[]
}

export interface IShopEvent {

}

export type ShopProps = IShopInput & IShopEvent;