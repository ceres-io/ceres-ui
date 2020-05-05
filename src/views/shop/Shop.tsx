import React, { FunctionComponent, useState, useRef, useEffect } from 'react';
import { ProductSearch } from '../../components/ProductSearch/ProductSearch';
import { ShopProps } from './Shop.types';
import { ProductList } from '../../components/ProductList/ProductList';
import { ProductTypeVO } from '../../models/ProductTypeVO';
import { ProductVO } from '../../models/ProductVO';
import { makeStyles, Theme, createStyles, Box, Paper } from '@material-ui/core';
import { ShoppingCartSidebar } from '../../components/ShoppingCartSidebar/ShoppingCartSidebar';
import { ShopJoyride } from '../../components/ShopJoyride/ShopJoyride';
import products from '../../resources/products.json';

const useStyles = makeStyles((theme: Theme) => createStyles(
  {
    container: {
      padding: theme.spacing(2)
    },
    productList: {
      paddingTop: theme.spacing(2),
    },
    sidebar: {
      paddingLeft: theme.spacing(2),
    }
  }
))

const availableProducts = products.products.filter(p => p.imageUrl).slice(0, 200)

export const Shop: FunctionComponent<ShopProps> = (props) => {

  const classes = useStyles();

  const [filteredProducts, setFilteredProducts] = useState<ProductTypeVO[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const onSearchChange = (productTypes: ProductTypeVO[]) => {
    setFilteredProducts(productTypes)
  }

  // Autofocus search box upon page entry
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef.current])

  const onRefineSearch = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  return (
    <React.Fragment>
      <ShopJoyride />
      <Box display='flex' flexDirection='row' className={classes.container}>
        <Box flexGrow={1}>
          <ProductSearch availableProducts={availableProducts} onChange={onSearchChange} inputRef={inputRef} />
          <div className={classes.productList}>
            <ProductList products={filteredProducts} onRefineSearch={onRefineSearch} />
          </div>
        </Box>
        <Box className={classes.sidebar}>
          <ShoppingCartSidebar showCheckoutButton />
        </Box>
      </Box>
    </React.Fragment>
  );
}