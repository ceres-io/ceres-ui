import {Box, Button, Card, CardMedia, createStyles, Grid, makeStyles, Theme} from "@material-ui/core";
import React, {FunctionComponent, useState} from "react";
import {ShoppingCartSidebar} from "../../components/ShoppingCartSidebar/ShoppingCartSidebar";
import {IAddress} from "../../components/HomeAddress/Address.types";
import {AddressList} from "../../components/HomeAddress/AddressList";
import {NewAddressForm} from "../../components/HomeAddress/NewAddress";
import {DeliveryProps} from "./Delivery.types";

const useStyles = makeStyles((theme: Theme) => createStyles(
    {
        container: {
            padding: theme.spacing(2)
        },
        productList: {
            paddingTop: theme.spacing(2),
        },
        sidebar: {
            paddingLeft: theme.spacing(2),
        },
        listCell: {
            width: "100%",
            height: "100%",
            maxHeight: 345,
            display: "flex",
            alignItems: "stretch",
            justifyContent: "center"
        },
        formCell: {
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "stretch",
            justifyContent: "center"
        },
        mediaCard: {
            width: "100%",
            height: "100%",
        },
        media: {
            height: "100%",
            width: "100%",
        }
    }
))

export const Delivery: FunctionComponent<DeliveryProps> = (props) => {
    const classes = useStyles();

    const [addresses, setAddresses] = useState<IAddress[]>(props.addresses)
    const [selectedAddress, setSelectedAddress] = useState<IAddress | undefined>(props.selectedAddress)

    const handleNewAddress = (newAddress: IAddress) => {
        let newList = [newAddress, ...addresses]
        setAddresses(newList);
        setSelectedAddress(newAddress);
    }

    const handleAddressRemoved = (newList: IAddress[], addressRemoved?: IAddress) => {
        setAddresses(newList)
    }

    return (
        <React.Fragment>
            <Box display={"flex"} flexDirection={"row"} className={classes.container}>
                <Box flexGrow={1}>
                    <Grid container
                          xs={12}
                          spacing={2}
                          direction={"row"}
                          justify={"space-around"}
                          alignItems={"stretch"}
                    >
                        <Grid item xs={12}>
                            <div className={classes.listCell}>
                                <Card className={classes.mediaCard}>
                                    <CardMedia className={classes.media}
                                               component="img"
                                               alt="Map view"
                                               image={require("../../resources/map.png")}
                                               title="Map"
                                    />
                                </Card>
                            </div>
                        </Grid>

                        <Grid item xs={6}>
                            <div className={classes.listCell}>
                                <AddressList addressType="Delivery"
                                             items={addresses}
                                             selectedItem={selectedAddress}
                                             onItemSelected={address => setSelectedAddress(address)}
                                             onItemRemoved={(l, a) => handleAddressRemoved(l, a)}/>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.formCell}>
                                <NewAddressForm onAddressAdded={address => handleNewAddress(address)}/>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.formCell}>
                                <Button color="primary"
                                        variant='contained'
                                        size="large"
                                        disabled={selectedAddress === undefined}
                                        onClick={() => {/*TODO*/
                                        }}>
                                    PLACE YOUR ORDER
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
                <Box className={classes.sidebar}>
                    <ShoppingCartSidebar/>
                </Box>
            </Box>

        </React.Fragment>

    );
}