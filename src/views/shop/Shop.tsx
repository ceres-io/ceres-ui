import React, { FunctionComponent, useState, useRef } from 'react';
import { ProductSearch } from '../../components/ProductSearch/ProductSearch';
import { ShopProps } from './Shop.types';
import { ProductList } from '../../components/ProductList/ProductList';
import { ProductTypeVO } from '../../models/ProductTypeVO';
import { ProductVO } from '../../models/ProductVO';
import { makeStyles, Theme, createStyles, Box } from '@material-ui/core';
import { ShoppingCartSidebar } from '../../components/ShoppingCartSidebar/ShoppingCartSidebar';


const useStyles = makeStyles((theme: Theme) => createStyles(
  {
    productList: {
      paddingTop: theme.spacing(2),
    },
    sidebar: {
      paddingLeft: theme.spacing(2)
    }
  }
))


export const Shop: FunctionComponent<ShopProps> = (props) => {

  const classes = useStyles();

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
      <Box display='flex' flexDirection='row'>
        <Box flexGrow={1}>
          <ProductSearch availableProducts={props.productTypes} onChange={onSearchChange} inputRef={inputRef} />

          <div className={classes.productList}>
            <ProductList products={filteredProducts} onRefineSearch={onRefineSearch} />
          </div>
        </Box>
        <Box className={classes.sidebar}>
          <ShoppingCartSidebar selectedProducts={[]} />
        </Box>
      </Box>
    </React.Fragment>
  );
}