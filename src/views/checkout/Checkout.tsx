import {Box, Button, createStyles, Grid, makeStyles, Theme} from "@material-ui/core";
import React, {FunctionComponent, useEffect, useState} from "react";
import {ShoppingCartSidebar} from "../../components/ShoppingCartSidebar/ShoppingCartSidebar";
import {ShopProps} from "../shop/Shop.types";
import {SelectionListProps} from "../../components/SelectionList/SelectionList.Types";
import {CheckoutProps} from "./Checkout.types";
import {ICreditCard} from "../../components/CreditCard/CreditCard.types";
import {IAddress} from "../../components/HomeAddress/Address.types";
import {CreditCardList} from "../../components/CreditCard/CreditCardList";
import {NewCreditCardForm} from "../../components/CreditCard/NewCard";
import {AddressList} from "../../components/HomeAddress/AddressList";
import {NewAddressForm} from "../../components/HomeAddress/NewAddress";

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
    }
))

export const Checkout: FunctionComponent<CheckoutProps> = (props) => {
    const classes = useStyles();

    const [cards, setCards] = useState<ICreditCard[]>(props.cards)
    const [selectedCard, setSelectedCard] = useState<ICreditCard | undefined>(props.selectedCard)
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

    const handleNewCard = (newCard: ICreditCard) => {
        let newList = [newCard, ...cards];
        setCards(newList);
        setSelectedCard(newCard);
    }

    const handleCardRemoved = (newList: ICreditCard[], cardRemoved?: ICreditCard) => {
        setCards(newList)
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
                        <Grid item xs={6}>
                            <div className={classes.listCell}>
                                <CreditCardList items={cards}
                                                selectedItem={selectedCard}
                                                onItemSelected={card => setSelectedCard(card)}
                                                onItemRemoved={(l, c) => handleCardRemoved(l, c)}/>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.formCell}>
                                <NewCreditCardForm onCardAdded={card => handleNewCard(card)}/>
                            </div>
                        </Grid>

                        <Grid item xs={6}>
                            <div className={classes.listCell}>
                                <AddressList items={addresses}
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
                                        disabled={selectedCard === undefined || selectedAddress === undefined}
                                        onClick={() => {/*TODO*/
                                        }}>
                                    CONTINUE
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