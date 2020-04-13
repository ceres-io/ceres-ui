import { ProductVO } from '../../../models/ProductVO';


export interface ICartTotalInput {
  products: ProductVO[]
}

export interface ICartTotalEvent {

}

export type CartTotalProps = ICartTotalInput & ICartTotalEvent