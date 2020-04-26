export interface IAddress {
    name: string,
    streetAddress: string,
    line2?: string,
    city: string,
    state: string,
    zip: string
}

export interface IAddressAddedEvent {
    onAddressAdded: (address: IAddress) => void
}

export type NewAddressProps = IAddressAddedEvent