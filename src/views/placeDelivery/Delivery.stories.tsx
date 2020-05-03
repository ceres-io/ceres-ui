import React from 'react';
import { ProductTypeVO } from '../../models/ProductTypeVO';
import { ProductVO } from '../../models/ProductVO';
import { IAddress } from "../../components/HomeAddress/Address.types";
import { Delivery } from "./Delivery";


export default { title: 'Delivery' };

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


let products: ProductVO[] = mockProductTypes.map(pt => ({ quantity: Math.floor(Math.random() * 10), type: pt }))

export const noData = () =>
    <div style={{ background: 'white' }}>
        <Delivery addresses={[]} />
    </div>

export const withData = () =>
    <div style={{ background: 'white' }}>
        <Delivery addresses={mockAddressList} />
    </div>