import React, { FunctionComponent, useState, useRef } from 'react';
import { ProductSearch } from '../../components/ProductSearch/ProductSearch';
import { ShopProps } from './Shop.types';
import { ProductList } from '../../components/ProductList/ProductList';
import { ProductTypeVO } from '../../models/ProductTypeVO';
import { ProductVO } from '../../models/ProductVO';
import { makeStyles, Theme, createStyles, Box, Paper } from '@material-ui/core';
import { ShoppingCartSidebar } from '../../components/ShoppingCartSidebar/ShoppingCartSidebar';
import Joyride, { ACTIONS, EVENTS } from 'react-joyride';

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


export const Shop: FunctionComponent<ShopProps> = (props) => {

  const classes = useStyles();

  const [filteredProducts, setFilteredProducts] = useState<ProductTypeVO[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const onSearchChange = (productTypes: ProductTypeVO[]) => {
    // let products: ProductVO[] = productTypes.map(pt => ({ quantity: Math.floor(Math.random() * 10), type: pt }))

    setFilteredProducts(productTypes)
  }

  const onRefineSearch = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  const steps = [
    {
      title: 'Hey',
      target: '#product-search',
      content: 'Test hey',
      spotlightClicks: true
    }
  ]

  return (
    <React.Fragment>
      <Joyride
        steps={steps}
        run={true}
      />
      <Box display='flex' flexDirection='row' className={classes.container}>
        <Box flexGrow={1}>
          <div id="product-search">
            <ProductSearch availableProducts={props.availableProducts} onChange={onSearchChange} inputRef={inputRef} />
          </div>
          <div className={classes.productList}>
            <ProductList products={filteredProducts} onRefineSearch={onRefineSearch} />
          </div>
        </Box>
        <Box className={classes.sidebar}>
          <ShoppingCartSidebar selectedProducts={props.products} />
        </Box>
      </Box>
    </React.Fragment>
  );
}