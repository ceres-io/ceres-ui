
export interface INewCardAddedEvent {
    onCardAdded: (creditCard: ICreditCard) => void
}

export interface ICreditCard {
    ccNumber: string,
    nameOnCard: string,
    expDate: string,
    ccvCode: string,
}

export type NewCardProps = INewCardAddedEvent