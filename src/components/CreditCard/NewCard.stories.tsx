import React from "react";
import {NewCreditCardForm} from "./NewCard";
import {action} from "@storybook/addon-actions";

export default {title: 'New Credit Card Input Form'};

export const normal = () => <NewCreditCardForm onCardAdded={action("Card Added")}/>;
