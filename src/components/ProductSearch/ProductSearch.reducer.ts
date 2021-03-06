import { ProductTypeVO } from '../../models/ProductTypeVO';
import { ProductSearchAction, ActionName, InputAction, SelectionAction } from './ProductSearch.action';
import { produce } from 'immer';
import matchSorter from 'match-sorter';
import { ProductSearchOption, ProductSearchOptionType } from './ProductSearch.types';
import { every } from 'lodash';

export interface IProductSearchState {
  options: ProductTypeVO[]
  filtered: ProductTypeVO[]
  selectedFilters: ProductSearchOption[]
  inputFilter: string
}

const getRandomProductTypes = (availableProducts: ProductTypeVO[]): ProductTypeVO[] => {
  return availableProducts.sort(() => 0.5 - Math.random()).slice(0, Math.ceil(Math.random() * 6))
}

export const getDefaultState = (availableProducts: ProductTypeVO[]): IProductSearchState => {
  return {
    options: availableProducts,
    filtered: getRandomProductTypes(availableProducts),
    selectedFilters: [],
    inputFilter: ''
  }
}

export const reducer = (state: IProductSearchState, action: ProductSearchAction) => {
  return produce(state, next => {
    switch (action.type) {
      case ActionName.Input: {
        let inputAction: InputAction = action as InputAction
        next.inputFilter = inputAction.payload.filter
        next.filtered = filterProducts(inputAction.payload.filter, state.selectedFilters, state.options)
        break;
      }
      case ActionName.Selection: {
        let selectionAction: SelectionAction = action as SelectionAction
        next.selectedFilters = selectionAction.payload.selected
        next.filtered = filterProducts('', selectionAction.payload.selected, state.options)
        // Clear input filter
        next.inputFilter = ''
        break;
      }
    }
  })
}

const filterProducts = (inputFilter: string, selectedFilters: ProductSearchOption[], products: ProductTypeVO[]): ProductTypeVO[] => {
  let filteredBasedOnSelected: ProductTypeVO[] = products.filter(p => {
    return every(selectedFilters, s => {
      switch (s.group) {
        case ProductSearchOptionType.Category: {
          let category = s.value as string
          return p.categories.includes(category)
        }
        case ProductSearchOptionType.Product: {
          let product = s.value as ProductTypeVO
          return p.name == product.name
        }
      }
    })
  })

  return matchSorter(filteredBasedOnSelected, inputFilter, { keys: ['name', 'categories'] })
}