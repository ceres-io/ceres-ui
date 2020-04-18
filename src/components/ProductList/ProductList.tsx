import React, { FunctionComponent, useState } from 'react';
import { ProductListProps } from './ProductList.types';
import { ProductItem } from '../ProductItem/ProductItem';
import { Grid, Typography, makeStyles, Theme, createStyles, Link } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ProductTypeVO } from '../../models/ProductTypeVO';


const MAX_PRODUCTS_PER_PAGE = 9;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    endMessage: {
      paddingTop: theme.spacing(2),
      textAlign: 'center'
    }
  })
)

export const ProductList: FunctionComponent<ProductListProps> = (props) => {
  const classes = useStyles();

  const [moreElements, setMoreElements] = useState(props.products.length > MAX_PRODUCTS_PER_PAGE);
  const [currentProducts, setCurrentProducts] = useState<ProductTypeVO[]>(props.products.slice(0, MAX_PRODUCTS_PER_PAGE));

  const fetchProducts = () => {
    console.log('fetching')
    console.log(props.products.length)

    if (currentProducts.length >= props.products.length) {
      console.log('no more')
      setMoreElements(false);
      return
    }

    console.log('setting new products')
    let page = currentProducts.length / MAX_PRODUCTS_PER_PAGE;

    console.log('currentpage', page)
    let newProducts = props.products.slice(0, (page + 1) * MAX_PRODUCTS_PER_PAGE);
    console.log(newProducts)
    setCurrentProducts(newProducts)
  }

  const onRefineSearchClicked = () => {
    console.log('refine clicked')
  }


  // TODO - add popup to say "Looks like you've been searching for a while... try narrowing down your search."

  return (
    <React.Fragment>
      <InfiniteScroll
        next={fetchProducts}
        loader='loading'
        hasMore={moreElements}
        dataLength={currentProducts.length}
        endMessage={
          <div className={classes.endMessage}>
            <Typography variant='body1'>
              You've reached the end! Didn't find what you're looking for?&nbsp;
              <Link onClick={onRefineSearchClicked}>
                Try redefining your search.
              </Link>
            </Typography>
          </div>
        }
        scrollThreshold={0.9}
      >
        <Grid container spacing={2}>
          {currentProducts.map(pt =>
            <Grid item>
              <ProductItem productType={pt} />
            </Grid>
          )}
        </Grid>
      </InfiniteScroll>
    </React.Fragment >
  );
}