import {ICreditCard} from "./CreditCard.types";
import {CreditCardList} from "./CreditCardList";
import React from "react";
import {action} from "@storybook/addon-actions";

export default {title: 'Credit Card Selection'};

let mockCardList: ICreditCard[] = [
    {
        ccNumber: '4444 - 1111 - 2222 - 3333',
        nameOnCard: 'John Doe',
        expDate: "Nov, 2020",
        ccvCode: "123"
    },
    {
        ccNumber: '5555 - 4444 - 5555 - 6666',
        nameOnCard: 'Jane Doe',
        expDate: "Dec, 2018",
        ccvCode: "123"
    },
    {
        ccNumber: '6666 - 7777 - 8888 - 9999',
        nameOnCard: 'Some extremely long name IDK',
        expDate: "Nov, 2020",
        ccvCode: "123"
    },
]

export const normal = () => <CreditCardList selectedItem={mockCardList[0]} items={mockCardList}
                                            onItemSelected={action("Credit card selected")}/>

export const withoutDefaultCard = () => <CreditCardList items={mockCardList}
                                                        onItemSelected={action("Credit card selected")}/>

export const noCardsEntered = () => <CreditCardList items={[]} onItemSelected={action("Credit card selected")}/>