import React, { FunctionComponent, useState, useRef } from 'react';
import { ProductSearch } from '../../components/ProductSearch/ProductSearch';
import { ShopProps } from './Shop.types';
import { ProductList } from '../../components/ProductList/ProductList';
import { ProductTypeVO } from '../../models/ProductTypeVO';
import { ProductVO } from '../../models/ProductVO';



export const Shop: FunctionComponent<ShopProps> = (props) => {

  const [filteredProducts, setFilteredProducts] = useState<ProductTypeVO[]>([]);

  const inputRef = useRef<HTMLInputElement>();

  const onSearchChange = (productTypes: ProductTypeVO[]) => {
    // let products: ProductVO[] = productTypes.map(pt => ({ quantity: Math.floor(Math.random() * 10), type: pt }))

    setFilteredProducts(productTypes)
  }

  const onRefineSearch = () => {
    inputRef.current.focus();
  }

  return (
    <React.Fragment>
      <ProductSearch availableProducts={props.productTypes} onChange={onSearchChange} inputRef={inputRef} />
      <ProductList products={filteredProducts} onRefineSearch={onRefineSearch} />
    </React.Fragment>
  );
}