import {IAddress} from "../../components/HomeAddress/Address.types";
import {ProductVO} from "../../models/ProductVO";

interface IDeliveryState {
    products: ProductVO[]
    addresses: IAddress[]
    selectedAddress?: IAddress
}

export type DeliveryProps = IDeliveryState