export interface SelectionListState<T> {
    selectedItem?: T
    items: T[]
}

export interface SelectionListEvents<T> {
    onItemSelected: (item?: T) => void;
    onItemRemoved: (list: T[], itemRemoved?: T) => void;
}

export type SelectionListProps<T> = SelectionListState<T> & SelectionListEvents<T>