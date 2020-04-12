import React, { FunctionComponent } from 'react';
import { ShoppingCartItemProps } from './ShoppingCartItem.types';
import { Container, Grid, Typography, IconButton, makeStyles, Box, Theme, createStyles } from '@material-ui/core';

import { Add, Remove, Delete } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    details: {
      width: 200
    },
    boxItem: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    productDetails: {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'auto'
    },
    buttons: {
      display: 'inline-block'
    }
  })
);

export const ShoppingCartItem: FunctionComponent<ShoppingCartItemProps> = (props) => {
  const classes = useStyles();

  return (
    <Container>
      <Box display='flex' alignItems='center' flexDirection='row' justifyContent='flex-start'>
        <Box className={classes.boxItem}>
          <Typography variant='subtitle2'>
            {props.product.quantity}
          </Typography>
        </Box>
        <Box
          className={`${classes.boxItem} ${classes.productDetails}`}
          flexGrow={2}
        >
          <Grid container direction='column'>
            <Grid item>
              <Typography variant='body1' className={classes.productDetails} noWrap>
                {props.product.type.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='body1'>
                {props.product.type.price}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box className={`${classes.boxItem} ${classes.buttons}`} flexGrow={1}>
          <Box display='flex' flexDirection='row'>
            <Box>
              <IconButton>
                <Add />
              </IconButton>
            </Box>
            <Box>
              <IconButton>
                <Remove />
              </IconButton>
            </Box>
            <Box>
              <IconButton>
                <Delete />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container >
  );
}