import { Box, Button, Card, CardMedia, createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import React, { FunctionComponent, useState } from "react";
import { ShoppingCartSidebar } from "../../components/ShoppingCartSidebar/ShoppingCartSidebar";
import { IAddress } from "../../components/HomeAddress/Address.types";
import { AddressList } from "../../components/HomeAddress/AddressList";
import { NewAddressForm } from "../../components/HomeAddress/NewAddress";
import { DeliveryProps } from "./Delivery.types";
import { useSelector, useDispatch } from "react-redux";
import { IApplicationStore } from "../../redux/store/store.types";
import { AddressAddedAction, AddressRemovedAction, CheckoutPage, AddressSelectedAction } from "../../redux/actions/CheckoutAction";
import { useRouter } from "react-router5";
import { RouteNames } from "../../routes/routes";
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
  const dispatch = useDispatch();
  const router = useRouter();

  const addresses = useSelector((store: IApplicationStore) => store.ceres.checkout.addresses)
  const selectedAddress = useSelector((store: IApplicationStore) => store.ceres.checkout.selectedDeliveryAddress)

  const handleNewAddress = (newAddress: IAddress) => {
    dispatch(new AddressAddedAction({ address: newAddress, page: CheckoutPage.Delivery }))
  }

  const handleAddressRemoved = (address?: IAddress) => {
    if (address) {
      dispatch(new AddressRemovedAction({ address, page: CheckoutPage.Delivery }))
    }
  }

  const handleAddressSelected = (address?: IAddress) => {
    if (address) {
      dispatch(new AddressSelectedAction({ address, page: CheckoutPage.Delivery }))
    }
  }

  const handleOrderClicked = () => {
    router.navigate(RouteNames.Track)
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
                  onItemSelected={handleAddressSelected}
                  onItemRemoved={(l, a) => handleAddressRemoved(a)} />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.formCell}>
                <NewAddressForm onAddressAdded={handleNewAddress} />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.formCell}>
                <Button color="primary"
                  variant='contained'
                  size="large"
                  disabled={selectedAddress === undefined}
                  onClick={handleOrderClicked}
                >
                  Place Your Order
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