import React from "react";
import Home from "./Home";
import {action} from "@storybook/addon-actions";

export default {title: 'Home'};

export const home = () =>
    <div style={{background: 'white'}}>
        <Home onNewCart={action("Zip entered")}/>
    </div>