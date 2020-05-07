import React, { useState } from 'react';
import { Box, Button, createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { IApplicationStore } from '../../redux/store/store.types';
import { HomeProps } from './Home.types';
import { connect, useDispatch } from 'react-redux';
import { IValidFieldProps } from "../../components/ResponsiveTextField/ResponsiveTextField.types";
import { extractNumbers, ValidatedField } from "../../components/ResponsiveTextField/ResponsiveTextField";
import { EcoTwoTone } from "@material-ui/icons";
import { useRouter } from 'react-router5';
import { RouteNames } from '../../routes/routes';
import { ZipAddedAction } from '../../redux/actions/CheckoutAction';

const useStyles = makeStyles((theme: Theme) => createStyles(
  {
    container: {
      padding: theme.spacing(2),
      height: "100vh",
      maxHeight: 750,
    },
    bannerGridRoot: {
      width: "100%"
    },
    banner: {
      minHeight: 0,
      display: "flex",
      flexDirection: "row",
      alignItems: "stretch",
      alignContent: "center",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    bannerText: {
      lineHeight: "1",
    },
    icon: {
      height: "100%",
      width: 120,
    },
    header: {
      marginTop: 10,
      marginBottom: 10,
      minHeight: 0,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    body: {
      height: 200,
      display: "flex",
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    gridRoot: {
      maxWidth: 1000
    },
    gridCell: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    zipCell: {
      width: "100%",
      maxWidth: 400,
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }
))

const ZipProps: IValidFieldProps = {
  label: "Enter Your Zip Code",
  includeCheckMark: true,
  helperText: "Zip should be 5 digits",
  filter: userInput => extractNumbers(userInput),
  parse: filtered => filtered,
  prettify: parsedInput => parsedInput.substr(0, 5),
  isValid: parsedInput => parsedInput.length >= 5
}


export const Home: React.FunctionComponent<HomeProps> = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const [zipCode, setZipCode] = useState("")

  const onStartClicked = () => {
    router.navigate(RouteNames.Shop)
    dispatch(new ZipAddedAction({ zip: zipCode }))
  }

  const onEnterPressed = () => {
    if (zipCode) {
      router.navigate(RouteNames.Shop)
      dispatch(new ZipAddedAction({ zip: zipCode }))
    }
  }

  const onShortcutStartClicked = () => {
    router.navigate(RouteNames.Shop)
  }

  return (
    <React.Fragment>
      <Box display={"flex"}
        flexDirection={"column"}
        className={classes.container}
        justifyContent={"center"}
      >
        <Box className={classes.banner}>
          <Grid container
            className={classes.bannerGridRoot}
            direction={"row"}
            spacing={1}
            alignItems={"center"}
            justify={"center"}>
            <Grid item>
              <Typography className={classes.bannerText} variant={"h1"}>
                <EcoTwoTone className={classes.icon}
                  color={"primary"} />
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.bannerText}
                variant={"h1"}
                color={"primary"}>
                {"CERES"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.header}>
          <Typography align={"center"}
            variant={"h3"}
            style={{ whiteSpace: "pre" }}>
            {"Your groceries, "}
          </Typography>
          <Typography align={"center"}
            variant={"h3"}>
            {"delivered straight to your doorstep"}
          </Typography>
        </Box>
        <Box flexGrow={1}
          className={classes.body}>
          <Grid className={classes.gridRoot}
            container
            spacing={2}
            direction={"column"}
            justify={"center"}>
            <Grid item>
              <div className={classes.gridCell}>
                <Typography align={"center"}
                  variant={"h4"}>
                  Try it out
                                </Typography>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.gridCell}>
                <div className={classes.zipCell}>
                  <ValidatedField {...ZipProps}
                    onValidatedChange={(c) => {
                      if (c.valid) {
                        setZipCode(c.prettyInput)
                      } else {
                        setZipCode("")
                      }
                    }}
                    onEnterPressed={onEnterPressed}
                  />
                </div>
              </div>
            </Grid>
            <Grid item alignItems={"center"}>
              <div className={classes.gridCell}>
                <Button variant={"contained"}
                  disabled={zipCode === ""}
                  color={"primary"}
                  onClick={onStartClicked}
                >
                  Start a New Cart
                </Button>
              </div>
            </Grid>
            <Grid item alignItems={"center"}>
              <div className={classes.gridCell}>
                <Button variant={"contained"}
                        color={"primary"}
                        onClick={onShortcutStartClicked}
                >
                  Continue without Zip Code
                </Button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </React.Fragment>
  );
}
