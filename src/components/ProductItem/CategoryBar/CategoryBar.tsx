import React, { FunctionComponent } from 'react';
import { CategoryBarProps } from './CategoryBar.types';

import { Container, makeStyles, Chip, Grid } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    whiteSpace: 'nowrap',
    overflowX: 'auto'
  },
  grid: {
    flexWrap: 'nowrap'
  }
})


export const CategoryBar: FunctionComponent<CategoryBarProps> = (props) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Grid className={classes.grid} container direction='row' spacing={1}>
        {props.categories.map(category =>
          <Grid item key={category}>
            <Chip label={category} size='small' variant='outlined' />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
