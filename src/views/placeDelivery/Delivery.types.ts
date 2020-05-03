import { IAddress } from "../../components/HomeAddress/Address.types";
import { ProductVO } from "../../models/ProductVO";

interface IDeliveryState {
    addresses: IAddress[]
    selectedAddress?: IAddress
}

export type DeliveryProps = IDeliveryState