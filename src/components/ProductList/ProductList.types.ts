import { ProductVO } from '../../models/ProductVO';
import { ProductTypeVO } from '../../models/ProductTypeVO';


export interface IProductListInput {
  products: ProductTypeVO[]
}

export interface IProductListEvent {
  onRefineSearch?: () => void;
}

export type ProductListProps = IProductListInput & IProductListEvent