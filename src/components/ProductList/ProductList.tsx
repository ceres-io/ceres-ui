import React, { FunctionComponent, useState, useRef, useEffect } from 'react';
import { ProductListProps } from './ProductList.types';
import { ProductItem } from '../ProductItem/ProductItem';
import { Grid, Typography, makeStyles, Theme, createStyles, Link, Popover, Box } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ProductTypeVO } from '../../models/ProductTypeVO';
import { InfoOutlined } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { IApplicationStore } from '../../redux/store/store.types';
import { ProductVO } from '../../models/ProductVO';


const MAX_PRODUCTS_PER_PAGE = 9;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    endMessage: {
      paddingTop: theme.spacing(2),
      textAlign: 'center'
    },
    popOverContent: {
      padding: theme.spacing(2),
    },
    productGrid: {
      justifyContent: 'center'
    }
  })
)

export const ProductList: FunctionComponent<ProductListProps> = (props) => {
  const classes = useStyles();

  const [moreElements, setMoreElements] = useState(true);
  const [currentProducts, setCurrentProducts] = useState<ProductTypeVO[]>([]);

  const selectedProducts = useSelector((store: IApplicationStore) => store.ceres.shopping.products);

  useEffect(() => {
    setMoreElements(props.products.length > MAX_PRODUCTS_PER_PAGE)
    setCurrentProducts(props.products.slice(0, MAX_PRODUCTS_PER_PAGE));
  }, [props.products])


  const [popOverOpen, setPopOverOpen] = useState(false);
  const [popOverDisplayed, setPopOverDisplayed] = useState(false);

  const rootElement = useRef(null);

  useEffect(() => {

    const totalPossiblePages = props.products.length / MAX_PRODUCTS_PER_PAGE;
    const currentPage = currentProducts.length / MAX_PRODUCTS_PER_PAGE;

    if (totalPossiblePages > 1 && currentPage > 2 && !popOverDisplayed) {
      setPopOverOpen(true);
      setPopOverDisplayed(true);
    }

  }, [currentProducts])


  const fetchProducts = () => {
    if (currentProducts.length >= props.products.length) {
      setMoreElements(false);
      return
    }

    let page = currentProducts.length / MAX_PRODUCTS_PER_PAGE;

    let newProducts = props.products.slice(0, (page + 1) * MAX_PRODUCTS_PER_PAGE);
    setCurrentProducts(newProducts);
  }

  const onRefineSearchClicked = () => {
    if (props.onRefineSearch) {
      props.onRefineSearch()
    }
  }


  const getProductQuantity = (productType: ProductTypeVO): number | undefined => {
    let product = selectedProducts.find(p => p.type.id == productType.id)
    if (product) {
      return product.quantity
    }
  }

  // TODO - add zero state for empty product list - prompt user with "no results found change your search"
  return (
    <div
      ref={rootElement}
    >
      <Popover
        anchorEl={rootElement.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={popOverOpen}
        onClick={() => setPopOverOpen(false)}
        disableAutoFocus={true}
        disableScrollLock={true}
      >
        <Grid container spacing={1} className={classes.popOverContent}>
          <Grid item>
            <InfoOutlined />
          </Grid>
          <Grid item>
            <Typography variant='body1'>
              Looks like you've been scrolling for a while.&nbsp;
                <Link onClick={onRefineSearchClicked}>
                Try narrowing down your search.
                </Link>
            </Typography>
          </Grid>
        </Grid>
      </Popover>
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
        <Grid container className={classes.productGrid} spacing={2}>
          {currentProducts.map(pt =>
            <Grid item className='product-item'>
              <ProductItem key={pt.name} productType={pt} quantity={getProductQuantity(pt)} />
            </Grid>
          )}
        </Grid>
      </InfiniteScroll>
    </div>
  );
}