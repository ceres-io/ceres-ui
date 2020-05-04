import { ProductVO } from "../../models/ProductVO";
import { SelectionListProps, SelectionListState } from "../../components/SelectionList/SelectionList.Types";
import { ICreditCard } from "../../components/CreditCard/CreditCard.types";
import { IAddress } from "../../components/HomeAddress/Address.types";

export interface ICheckoutInput {
    cards?: ICreditCard[]
    addresses?: IAddress[]
    selectedCard?: ICreditCard
    selectedAddress?: IAddress
    zip?: string
}

export interface ICheckoutEvent {

}

export type CheckoutProps = ICheckoutInput & ICheckoutEvent