import {makeStyles} from "@material-ui/core/styles";
import React, {FunctionComponent, useState} from "react";
import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    Radio,
    Typography
} from "@material-ui/core";

import {SelectionListProps} from "../SelectionList/SelectionList.Types";
import {IAddress} from "./Address.types";

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
    },
    cardContent: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 0,
        paddingBottom: 0
    },
    grid: {
        margin: 0
    },
    gridRow: {
        margin: 0,
    },
    radioLabel: {
        width: "100%",
    },
    title: {
        lineHeight: 1
    },
    nameLabel: {},
    endingIn: {
        color: "gray"
    },
    last4Digits: {},
    rowItem: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center"
    }
})

function uniqueAddress(address: IAddress | undefined): string | undefined {
    if (address === undefined) {
        return undefined;
    }
    return [address.streetAddress].join(".");
}

export const AddressList: FunctionComponent<SelectionListProps<IAddress>> = (props) => {
    const classes = useStyles();
    const [selectedAddress, setSelectedAddress] = useState(props.selectedItem)

    const handleChange = (address: IAddress) => {
        setSelectedAddress(address);
        props.onItemSelected(address);
    }

    const addressRadioGroup = () => {
        if (props.items.length > 0) {
            return (
                <Grid container xs={12}
                      className={classes.grid}
                      direction='column'
                      spacing={0}
                      justify="center"
                      alignItems="stretch"
                      alignContent="center"
                >
                    {props.items.map(address => AddressRow(address, selectedAddress, handleChange))}
                </Grid>
            );
        } else {
            return (
                <Typography>
                    Please add a new address
                </Typography>
            );
        }
    }

    return (
        <Card className={classes.root}>
            <CardHeader title={"Your Addresses"}/>
            <CardContent className={classes.cardContent}>
                {addressRadioGroup()}
            </CardContent>
        </Card>
    )
}

const AddressRow = (address: IAddress,
                    selectedAddress: IAddress | undefined,
                    handleChange: (c: IAddress) => void) => {
    const classes = useStyles()

    const prettyAddress = () => {
        if(address.line2 === undefined) {
            return address.streetAddress
        } else {
            return address.streetAddress + ", " + address.line2
        }
    }

    const prettyCityStateZip = () => {
        return address.city + ", " + address.state + " " + address.zip
    }

    if (selectedAddress === address) {
        return (
            <Grid container item
                  className={classes.gridRow}
                  direction="row"
                  spacing={1}
                  alignItems="stretch"
                  onClick={() => handleChange(address)}
            >
                <Grid item>
                    <div className={classes.rowItem}>
                        <Radio
                            checked={selectedAddress === address}
                        />
                    </div>
                </Grid>
                <Grid container item xs direction={"column"} spacing={0} alignItems={"stretch"}>
                    <Grid item>
                        <div className={classes.rowItem}>
                            <Typography noWrap>
                                {address.name}
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item>
                        <div className={classes.rowItem}>
                            <Typography noWrap>
                                {prettyAddress()}
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item>
                        <div className={classes.rowItem}>
                            <Typography noWrap>
                                {prettyCityStateZip()}
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        );
    } else {
        return (
            <Grid container item
                  className={classes.gridRow}
                  direction="row"
                  spacing={1}
                  alignItems="stretch"
                  onClick={() => handleChange(address)}
            >
                <Grid item>
                    <div className={classes.rowItem}>
                        <Radio
                            checked={selectedAddress === address}
                        />
                    </div>
                </Grid>
                <Grid item xs zeroMinWidth>
                    <div className={classes.rowItem}>
                        <Typography noWrap>
                            {address.name}
                        </Typography>
                    </div>
                </Grid>
                <Grid item zeroMinWidth>
                    <div className={classes.rowItem}>
                        <Typography noWrap>
                            {address.streetAddress}
                        </Typography>
                    </div>
                </Grid>
            </Grid>
        );
    }
}