import React from "react";
import {NewAddressForm} from "./NewAddress";
import {action} from "@storybook/addon-actions";

export default {title: 'New Address Input Form'};

export const normal = () => <NewAddressForm onAddressAdded={action("Address added")}/>;