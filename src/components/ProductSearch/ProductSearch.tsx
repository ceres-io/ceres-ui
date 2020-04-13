import React, { FunctionComponent, useReducer, useEffect } from 'react';
import { ProductSearchProps, ProductSearchOption, ProductSearchOptionType } from './ProductSearch.types';

import { Autocomplete } from '@material-ui/lab';
import { ProductTypeVO } from '../../models/ProductTypeVO';
import { TextField, InputAdornment, Chip } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { debounce } from 'debounce';
import matchSorter from 'match-sorter';
import { reducer, getDefaultState, IProductSearchState } from './ProductSearch.reducer';
import logger from 'use-reducer-logger';
import { InputAction, SelectionAction } from './ProductSearch.action';

// enum ProductSearchOptionType {
//   Category = 'category',
//   Product = 'product'
// }

// interface ProductSearchOption {
//   group: ProductSearchOptionType
//   label: string
//   value: string | ProductTypeVO
// }

enum ProductSearchInputEventType {
  input = 'input',
  selection = 'selection'
}

interface ProductSearchInputEvent {
  type: ProductSearchInputEventType
  value: string | ProductSearchOption
}


export const ProductSearch: FunctionComponent<ProductSearchProps> = (props) => {
  const initialState: IProductSearchState = getDefaultState(props.availableProducts);
  const [state, dispatch] = useReducer(logger(reducer), initialState)

  useEffect(() => {
    debouncedDispatch()
  }, [state.filtered])

  const dispatchOnChange = () => {
    if (props.onChange) {
      props.onChange(state.filtered)
    }
  }

  const debouncedDispatch = debounce(dispatchOnChange, 400, false)


  const filterOptions = (options: ProductSearchOption[], { inputValue }: { inputValue: string }): ProductSearchOption[] => {
    return matchSorter(options, inputValue, { keys: ['label'] });
  }

  const getSearchOptions = (): ProductSearchOption[] => {
    let productOptions: ProductSearchOption[] = props.availableProducts.map(pt => ({ group: ProductSearchOptionType.Product, label: pt.name, value: pt }))

    let uniqueCategoryNames: Set<string> = new Set();
    props.availableProducts.forEach(pt => pt.categories.forEach(c => uniqueCategoryNames.add(c)))

    let categoryOptions: ProductSearchOption[] = Array.from(uniqueCategoryNames).map(c => ({ group: ProductSearchOptionType.Category, label: c, value: c }))

    // Show categories first
    let searchOptions: ProductSearchOption[] = categoryOptions.concat(productOptions)

    return searchOptions
  }

  const onInputChange = (event: object, value: string, reason: string) => {
    switch (reason) {
      case 'input': {
        dispatch(new InputAction({ filter: value }));
        break;
      }
    }
  }

  const onOptionSelect = (event: object, values: ProductSearchOption[], reason: string) => {
    switch (reason) {
      case 'select-option': {
        dispatch(new SelectionAction({ selected: values }));
        break;
      }
    }
  }

  // TODO - look into using `MultipleValues` type to persist category tags
  return (
    <Autocomplete<ProductSearchOption>
      multiple
      id='product-search'
      options={getSearchOptions()}
      groupBy={o => o.group}
      getOptionLabel={o => o.label}
      renderTags={(options, getTagProps) =>
        options.map((option, index) => (
          <Chip label={`${option.group}: ${option.label}`} {...getTagProps({ index })} />
        ))
      }
      renderInput={params => <TextField {...params} label='Search for a product or category' variant='filled' />}
      onInputChange={onInputChange}
      filterOptions={filterOptions}
      onChange={onOptionSelect}
      autoHighlight
    />
  )
}