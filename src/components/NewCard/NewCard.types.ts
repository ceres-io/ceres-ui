export interface INewCardInput {
    cardNumber?: string
    nameOnCard?: string
    expirationDate?: string
    ccv?: string
}

export interface INewCardEvent {
    onCardNumberChange?: (input: string) => void;
    onNameChange?: (input: string) => void;
    onExpirationDateChange?: (input: string) => void;
    onCcvChange?: (input: string) => void;
}

export type NewCardProps = INewCardInput & INewCardInput