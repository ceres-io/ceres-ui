import React from "react";
import {action} from "@storybook/addon-actions";
import {IAddress} from "./Address.types";
import {AddressList} from "./AddressList";

export default {title: 'Address Selection'};

let mockAddressList: IAddress[] = [
    {
        name: "John Doe",
        streetAddress: "1234 Fake St.",
        city: "Molassas",
        state: "VA",
        zip: "12345"
    },
    {
        name: "Jane Doe",
        streetAddress: "987 False Ave.",
        city: "Poughkeepsie",
        state: "NY",
        zip: "66666"
    },
    {
        name: "Johnathan Doedo",
        streetAddress: "420 Blaze It Pl.",
        line2: "APT 69",
        city: "Denver",
        state: "CO",
        zip: "42069"
    }
]

export const normal = () => <AddressList selectedItem={mockAddressList[0]}
                                         items={mockAddressList}
                                         onItemSelected={action("Address selected")}
                                         onItemRemoved={action("Address removed")}/>

export const withoutDefaultAddress = () => <AddressList items={mockAddressList}
                                                        onItemSelected={action("Address selected")}
                                                        onItemRemoved={action("Address removed")}/>

export const noAddressesEntered = () => <AddressList items={[]}
                                                     onItemSelected={action("Address selected")}
                                                     onItemRemoved={action("Address removed")}/>