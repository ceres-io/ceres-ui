import {makeStyles} from "@material-ui/core/styles";
import React, {FunctionComponent, useEffect, useState} from "react";
import {Button, Card, CardContent, CardHeader, Grid, IconButton, Radio, Snackbar, Typography} from "@material-ui/core";
import {IAddress} from "./Address.types";
import {SelectionListProps} from "../SelectionList/SelectionList.Types";
import {Close} from "@material-ui/icons";

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        width: "100%",
        overflowY: "auto",
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

interface AddressMemory {
    address: IAddress
    wasSelected: boolean
    index: number
}

export const AddressList: FunctionComponent<SelectionListProps<IAddress>> = (props) => {
    const classes = useStyles();
    const [selectedAddress, setSelectedAddress] = useState<IAddress | undefined>(undefined)
    const [addresses, setAddresses] = useState<IAddress[]>([])
    const [memory, setMemory] = useState<AddressMemory | undefined>(undefined)

    useEffect(() => {
        setAddresses(props.items)
        setSelectedAddress(props.selectedItem)
        console.log(props)
    }, [props.items])

    const handleChange = (address: IAddress) => {
        setSelectedAddress(address);
        props.onItemSelected(address);
    }

    const handleRemoval = (address: IAddress) => {
        let newList = addresses.filter(a => a !== address)
        setAddresses(newList);
        if (address === selectedAddress) {
            setSelectedAddress(undefined)
            props.onItemSelected(undefined)
        }
        props.onItemRemoved(newList, address)
        setMemory({address: address, wasSelected: address === selectedAddress, index: addresses.indexOf(address)})
    }


    const handleToastClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) =>{
        if (reason === 'clickaway') {
            return;
        }

        setMemory(undefined)
    }

    const handleAddressUndo = () => {
        if(memory === undefined) {
            return;
        }

        let newList = [
            ...(addresses.slice(0, memory.index)),
            memory.address,
            ...(addresses.slice(memory.index, addresses.length))
        ];
        setAddresses(newList);
        if(memory.wasSelected) {
            setSelectedAddress(memory.address);
            props.onItemSelected(memory.address);
        }
        setMemory(undefined)
    }

    const addressRadioGroup = () => {
        if (addresses.length > 0) {
            return (
                <Grid container xs={12}
                      className={classes.grid}
                      direction='column'
                      spacing={0}
                      justify="center"
                      alignItems="stretch"
                      alignContent="center"
                >
                    {addresses.map(address => addressRow(address))}
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

    const addressRow = (address: IAddress) => {
        if (selectedAddress === address) {
            return (
                <Grid container item
                      className={classes.gridRow}
                      direction="row"
                      spacing={1}
                      alignItems="stretch"
                >
                    <Grid item>
                        <div className={classes.rowItem}>
                            <Radio
                                checked={selectedAddress === address}
                                onClick={() => handleChange(address)}
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
                                    {prettyAddress(address)}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item>
                            <div className={classes.rowItem}>
                                <Typography noWrap>
                                    {prettyCityStateZip(address)}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <div className={classes.rowItem}>
                            <IconButton onClick={() => handleRemoval(address)}>
                                <Close />
                            </IconButton>
                        </div>
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
                >
                    <Grid item>
                        <div className={classes.rowItem}>
                            <Radio
                                checked={selectedAddress === address}
                                onClick={() => handleChange(address)}
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
                    <Grid item>
                        <div className={classes.rowItem}>
                            <IconButton onClick={() => handleRemoval(address)}>
                                <Close />
                            </IconButton>
                        </div>
                    </Grid>
                </Grid>
            );
        }
    }

    const prettyAddress = (address: IAddress) => {
        if (address.line2 === undefined) {
            return address.streetAddress
        } else {
            return address.streetAddress + ", " + address.line2
        }
    }

    const prettyCityStateZip = (address: IAddress) => {
        return address.city + ", " + address.state + " " + address.zip
    }

    return (
        <Card className={classes.root}>
            <CardHeader title={"Your Addresses"}/>
            <CardContent className={classes.cardContent}>
                {addressRadioGroup()}
            </CardContent>
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
                open={memory !== undefined}
                autoHideDuration={3000}
                onClose={handleToastClose}
                message={"Address removed"}
                action={
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={handleAddressUndo}>
                            UNDO
                        </Button>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleToastClose}>
                            <Close fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </Card>
    )
}