import { ProductVO } from '../../models/ProductVO';
import { ProductTypeVO } from '../../models/ProductTypeVO';


export interface IProductListInput {
  products: ProductTypeVO[]
}

export interface IProductListEvent {

}

export type ProductListProps = IProductListInput & IProductListEvent