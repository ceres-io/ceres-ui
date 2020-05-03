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
import { CardAddedAction, CardRemovedAction, AddressAddedAction, AddressRemovedAction } from "../../redux/actions/CheckoutAction";


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
  const router = useRouter();
  const dispatch = useDispatch();

  // const [cards, setCards] = useState<ICreditCard[]>(props.cards)
  const [selectedCard, setSelectedCard] = useState<ICreditCard | undefined>(props.selectedCard)
  // const [addresses, setAddresses] = useState<IAddress[]>(props.addresses)
  const [selectedAddress, setSelectedAddress] = useState<IAddress | undefined>(props.selectedAddress)


  const cards = useSelector((store: IApplicationStore) => store.ceres.checkout.cards)
  const addresses = useSelector((store: IApplicationStore) => store.ceres.checkout.addresses)

  const handleNewAddress = (newAddress: IAddress) => {
    dispatch(new AddressAddedAction({ address: { id: addresses.length + 1, ...newAddress } }))
    // setSelectedAddress(newAddress);
  }

  const handleAddressRemoved = (address?: IAddress) => {
    // setAddresses(newList)
    if (address) {
      dispatch(new AddressRemovedAction({ address: { id: addresses.length + 1, ...address } }))
    }
  }

  const handleNewCard = (newCard: ICreditCard) => {
    // let newList = [newCard, ...cards];
    // setCards(newList);

    dispatch(new CardAddedAction({ card: newCard }));
    // setSelectedCard(newCard);
  }

  // TODO why is card optional
  const handleCardRemoved = (card?: ICreditCard) => {
    if (card) {
      dispatch(new CardRemovedAction({ card }))
    }
  }

  const onContinueClick = () => {
    router.navigate(RouteNames.Delivery)
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
                  onItemSelected={address => setSelectedAddress(address)}
                  onItemRemoved={(l, a) => handleAddressRemoved(a)} />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.formCell}>
                <NewAddressForm onAddressAdded={address => handleNewAddress(address)} />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.formCell}>
                <Button color="primary"
                  variant='contained'
                  size="large"
                  disabled={selectedCard === undefined || selectedAddress === undefined}
                  onClick={onContinueClick}
                >
                  Continue
                </Button>
              </div>
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.sidebar}>
          <ShoppingCartSidebar showCheckoutButton={false} />
        </Box>
      </Box>

    </React.Fragment>

  );
}