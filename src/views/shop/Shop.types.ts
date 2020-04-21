import { ProductTypeVO } from '../../models/ProductTypeVO';
import { ProductVO } from '../../models/ProductVO';

export interface IShopInput {
  availableProducts: ProductTypeVO[],
  products: ProductVO[]
}

export interface IShopEvent {

}

export type ShopProps = IShopInput & IShopEvent;