import React, { FunctionComponent } from 'react';
import { ProductSearchProps } from './ProductSearch.types';

import { Autocomplete } from '@material-ui/lab';
import { ProductTypeVO } from '../../models/ProductTypeVO';
import { TextField } from '@material-ui/core';

import { debounce } from 'debounce';
import matchSorter from 'match-sorter';

enum ProductSearchOptionType {
  Category = 'category',
  Product = 'product'
}

interface ProductSearchOption {
  group: ProductSearchOptionType
  label: string
  value: string | ProductTypeVO
}

enum ProductSearchInputEventType {
  input = 'input',
  selection = 'selection'
}

interface ProductSearchInputEvent {
  type: ProductSearchInputEventType
  value: string | ProductSearchOption
}


export const ProductSearch: FunctionComponent<ProductSearchProps> = (props) => {

  const dispatchOnChange = (event: ProductSearchInputEvent) => {
    if (props.onChange) {
      let products: ProductTypeVO[] = []
      switch (event.type) {
        case ProductSearchInputEventType.input: {
          products = getMatchingProducts(event.value as string)
          break;
        }
        case ProductSearchInputEventType.selection: {
          products = getSelectionResult(event.value as ProductSearchOption)
        }
      }

      props.onChange(products)
    }
  }

  const debouncedDispatch = debounce(dispatchOnChange, 400, false)


  const filterOptions = (options: ProductSearchOption[], { inputValue }): ProductSearchOption[] => {
    return matchSorter(options, inputValue, { keys: ['label'] });
  }

  const getMatchingProducts = (filter: string): ProductTypeVO[] => {
    return matchSorter(props.availableProducts, filter, { keys: ['name'] })
  }

  const getSelectionResult = (selected: ProductSearchOption): ProductTypeVO[] => {
    switch (selected.group) {
      case ProductSearchOptionType.Category: {
        let category: string = selected.value as string
        let categoryProducts: ProductTypeVO[] = props.availableProducts.filter(pt => pt.categories.includes(category))

        // TODO - set category as chip in search
        return categoryProducts
      }
      case ProductSearchOptionType.Product: {
        return [selected.value as ProductTypeVO]
      }
    }
  }


  // Option can be a category OR a product
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
        debouncedDispatch({ type: ProductSearchInputEventType.input, value: value });
        break;
      }
    }
  }

  const onOptionSelect = (event: object, value: ProductSearchOption, reason: string) => {
    switch (reason) {
      case 'select-option': {
        dispatchOnChange({ type: ProductSearchInputEventType.selection, value: value })
        break;
      }
    }
  }

  // TODO - look into using `MultipleValues` type to persist category tags
  return (
    <Autocomplete<ProductSearchOption>
      id='product-search'
      options={getSearchOptions()}
      groupBy={o => o.group}
      getOptionLabel={o => o.label}
      renderInput={params => <TextField {...params} label='Search for a product or category' variant='filled' />}
      onInputChange={onInputChange}
      filterOptions={filterOptions}
      onChange={onOptionSelect}
    />
  )
}