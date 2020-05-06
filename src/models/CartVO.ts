import { ProductVO } from './ProductVO';
import { AddressVO } from './AddressVO';


export class CartVO {
  products: ProductVO[] = [];
  deliveryAddress: AddressVO = new AddressVO();
  date: Date = new Date();
}