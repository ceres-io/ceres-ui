import { Box, Button, createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import React, { FunctionComponent, useEffect, useState } from "react";
import { ShoppingCartSidebar } from "../../components/ShoppingCartSidebar/ShoppingCartSidebar";
import { ShopProps } from "../shop/Shop.types";
import { SelectionListProps } from "../../components/SelectionList/SelectionList.Types";
import { CheckoutProps } from "./Checkout.types";
import { ICreditCard } from "../../components/CreditCard/CreditCard.types";
import { IAddress } from "../../components/HomeAddress/Address.types";
import { CreditCardList } from "../../components/CreditCard/CreditCardList";
import { NewCreditCardForm } from "../../components/CreditCard/NewCard";
import { AddressList } from "../../components/HomeAddress/AddressList";
import { NewAddressForm } from "../../components/HomeAddress/NewAddress";
import { useRouter } from "react-router5";
import { RouteNames } from "../../routes/routes";
import { useSelector, useDispatch } from "react-redux";
import { IApplicationStore } from "../../redux/store/store.types";
import { CardAddedAction, CardRemovedAction, AddressAddedAction, AddressRemovedAction, CardSelectedAction, AddressSelectedAction, CheckoutPage } from "../../redux/actions/CheckoutAction";
import { CheckoutStepper } from "../../components/CheckoutStepper/CheckoutStepper";


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
    navButton: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2)
    },
    buttonBar: {
      marginTop: theme.spacing(2)
    }
  }
))

export const Checkout: FunctionComponent<CheckoutProps> = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const cards = useSelector((store: IApplicationStore) => store.ceres.checkout.cards)
  const selectedCard = useSelector((store: IApplicationStore) => store.ceres.checkout.selectedCard)
  const addresses = useSelector((store: IApplicationStore) => store.ceres.checkout.addresses)
  const selectedAddress = useSelector((store: IApplicationStore) => store.ceres.checkout.selectedBillingAddress)
  const zip = useSelector((store: IApplicationStore) => store.ceres.checkout.zip)

  const handleNewAddress = (newAddress: IAddress) => {
    dispatch(new AddressAddedAction({ address: newAddress, page: CheckoutPage.Checkout }))
  }

  const handleAddressRemoved = (address?: IAddress) => {
    if (address) {
      dispatch(new AddressRemovedAction({ address, page: CheckoutPage.Checkout }))
    }
  }

  const handleAddressSelected = (address?: IAddress) => {
    if (address) {
      dispatch(new AddressSelectedAction({ address, page: CheckoutPage.Checkout }))
    }
  }

  const handleNewCard = (newCard: ICreditCard) => {
    dispatch(new CardAddedAction({ card: newCard }));
  }

  // TODO why is card optional
  const handleCardRemoved = (card?: ICreditCard) => {
    if (card) {
      dispatch(new CardRemovedAction({ card }))
    }
  }

  const handleCardSelected = (card?: ICreditCard) => {
    if (card) {
      dispatch(new CardSelectedAction({ card }))
    }
  }

  const onContinueClick = () => {
    router.navigate(RouteNames.Delivery)
  }

  const onBackClick = () => {
    router.navigate(RouteNames.Shop)
  }


  return (
    <React.Fragment>
      <CheckoutStepper />
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
                  onItemSelected={handleCardSelected}
                  onItemRemoved={(l, c) => handleCardRemoved(c)} />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.formCell}>
                <NewCreditCardForm onCardAdded={card => handleNewCard(card)} />
              </div>
            </Grid>

            <Grid item xs={6}>
              <div className={classes.listCell}>
                <AddressList addressType="Billing" items={addresses}
                  selectedItem={selectedAddress}
                  onItemSelected={handleAddressSelected}
                  onItemRemoved={(l, a) => handleAddressRemoved(a)} />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.formCell}>
                <NewAddressForm zip={zip} onAddressAdded={address => handleNewAddress(address)} />
              </div>
            </Grid>
            <Grid item xs={12}>
              <Box className={classes.buttonBar} display='flex' flexDirection='row' justifyContent='center'>
                <Box className={classes.navButton}>
                  <Button color='primary'
                    variant='contained'
                    size='large'
                    onClick={onBackClick}
                  >
                    Back
                  </Button>
                </Box>
                <Box className={classes.navButton}>
                  <Button color="primary"
                    variant='contained'
                    size="large"
                    disabled={selectedCard === undefined || selectedAddress === undefined}
                    onClick={onContinueClick}
                  >
                    Continue
                </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.sidebar}>
          <ShoppingCartSidebar showCheckoutButton={false} />
        </Box>
      </Box>

    </React.Fragment >

  );
}