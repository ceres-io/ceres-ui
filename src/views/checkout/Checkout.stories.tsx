import React from 'react';
import {ProductTypeVO} from '../../models/ProductTypeVO';
import {ProductVO} from '../../models/ProductVO';
import {Checkout} from "./Checkout";
import {ICreditCard} from "../../components/CreditCard/CreditCard.types";
import {IAddress} from "../../components/HomeAddress/Address.types";


export default {title: 'Checkout'};

let mockProductTypes: ProductTypeVO[] = [
    {
        id: 0,
        name: 'Kroger Vitamin A & D Reduced Fat 2% Milk',
        price: 10,
        imageUrl: 'https://spoonacular.com/productImages/27693-312x231.jpg',
        categories: ['Snacks', 'Pizza', 'Junk Food']
    },
    {
        id: 1,
        name: 'Eggs',
        price: 2,
        imageUrl: 'https://spoonacular.com/productImages/27693-312x231.jpg',
        categories: ['Dairy']
    },
    {
        id: 2,
        name: 'Milk',
        price: 6,
        imageUrl: 'https://spoonacular.com/productImages/27693-312x231.jpg',
        categories: ['Dairy', 'Cow']
    },
    {
        id: 3,
        name: 'Pizza',
        price: 6,
        imageUrl: 'https://spoonacular.com/productImages/27693-312x231.jpg',
        categories: ['Dairy', 'Cow']
    },
]

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


let products: ProductVO[] = mockProductTypes.map(pt => ({quantity: Math.floor(Math.random() * 10), type: pt}))

export const noData = () =>
    <div style={{background: 'white'}}>
        <Checkout products={products} cards={[]} addresses={[]}/>
    </div>

export const withData = () =>
    <div style={{background: 'white'}}>
        <Checkout products={products} cards={mockCardList} addresses={mockAddressList}/>
    </div>

export const withDefaults = () =>
    <div style={{background: 'white'}}>
        <Checkout products={products} cards={mockCardList} selectedCard={mockCardList[1]} addresses={mockAddressList} selectedAddress={mockAddressList[1]}/>
    </div>