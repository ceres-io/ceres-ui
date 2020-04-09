import { ProductTypeVO } from '../../models/ProductTypeVO';
import { ProductSearchAction, ActionName, InputAction, SelectionAction } from './ProductSearch.action';
import { produce } from 'immer';
import matchSorter from 'match-sorter';
import { ProductSearchOption, ProductSearchOptionType } from './ProductSearch.types';

export interface IProductSearchState {
  options: ProductTypeVO[]
  filtered: ProductTypeVO[]
  categories: string[]
}

export const getDefaultState = (availableProducts: ProductTypeVO[]): IProductSearchState => {
  return {
    options: availableProducts,
    filtered: [],
    categories: []
  }
}

export const reducer = (state: IProductSearchState, action: ProductSearchAction) => {
  return produce(state, next => {
    switch (action.type) {
      case ActionName.Input: {
        let inputAction: InputAction = action as InputAction
        next.filtered = filterProducts(inputAction.payload.filter, state.options)
        break;
      }
      case ActionName.Selection: {
        let selectionAction: SelectionAction = action as SelectionAction
        next.filtered = getSelectedOptionProducts(selectionAction.payload.selected, state.options)
        break;
      }
    }
  })
}

const filterProducts = (filter: string, products: ProductTypeVO[]): ProductTypeVO[] => {
  return matchSorter(products, filter, { keys: ['name'] })
}

const getSelectedOptionProducts = (selected: ProductSearchOption, products: ProductTypeVO[]): ProductTypeVO[] => {
  switch (selected.group) {
    case ProductSearchOptionType.Category: {
      let category: string = selected.value as string
      let categoryProducts: ProductTypeVO[] = products.filter(pt => pt.categories.includes(category))

      // TODO - set category as chip in search
      return categoryProducts
    }
    case ProductSearchOptionType.Product: {
      return [selected.value as ProductTypeVO]
    }
  }
}