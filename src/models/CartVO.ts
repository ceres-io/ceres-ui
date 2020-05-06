import { ProductVO } from './ProductVO';
import { AddressVO } from './AddressVO';


export class CartVO {
  products: ProductVO[] = [];
  deliveryAddress: AddressVO;
  date: Date;
}