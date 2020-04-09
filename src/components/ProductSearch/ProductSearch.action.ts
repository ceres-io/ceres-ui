import { Action } from 'redux';
import { ProductSearchOption } from './ProductSearch.types';

export enum ActionName {
  Input = '@ProductSearch/input',
  Selection = '@ProductSearch/selection'
}

export interface IInputPayload {
  filter: string
}

export class InputAction implements Action<ActionName> {
  type = ActionName.Input;
  constructor(public payload: IInputPayload) {
  }
}

export interface ISelectionPayload {
  selected: ProductSearchOption[]
}

export class SelectionAction implements Action<ActionName> {
  type = ActionName.Selection;
  constructor(public payload: ISelectionPayload) {
  }
}

export type ProductSearchAction = InputAction | SelectionAction;