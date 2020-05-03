import {SelectionListProps} from "../SelectionList/SelectionList.Types";
import {IAddress} from "./Address.types";

interface IAddressListType {
    addressType?: string
}

export type AddressListProps = SelectionListProps<IAddress> & IAddressListType
