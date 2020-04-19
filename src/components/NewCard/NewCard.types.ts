export interface INewCardInput {
    cardNumber?: string
    nameOnCard?: string
    expirationDate?: string
    ccv?: string
}

export type NewCardProps = INewCardInput & INewCardCheck