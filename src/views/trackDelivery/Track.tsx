import {
    Box,
    Card,
    CardMedia,
    createStyles,
    Divider,
    Grid,
    IconButton,
    makeStyles,
    Theme,
    Typography
} from "@material-ui/core";
import React, {FunctionComponent, useEffect, useState} from "react";
import {TrackingProps} from "./Track.types";
import {GpsFixed} from "@material-ui/icons";
import {IValidFieldProps} from "../../components/ResponsiveTextField/ResponsiveTextField.types";
import {ValidatedField} from "../../components/ResponsiveTextField/ResponsiveTextField";

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
        gridRoot: {
            maxWidth: 1000
        },
        text: {
            width: "100%",
        },
        trackEntry: {
            width: "100%",
        },
        gridCell: {
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
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
            maxWidth: 1000,
            height: 500
        },
        media: {
            height: 345,
            paddingTop: "50%"
        }
    }
))

const removeSpaces = (s: string) => {
    return Array.from(s)
        .filter(c => /[^ ]/i.test(c))
        .join("")
}

const TrackField: IValidFieldProps = {
    label: "Tracking Number",
    includeCheckMark: true,
    helperText: "Tracking numbers should be 10 characters w/o spaces",
    filter: userInput => userInput,
    parse: filtered => removeSpaces(filtered),
    prettify: parsedInput => parsedInput,

    isValid: parsedInput => {
        return parsedInput.length >= 10;
    }
}

export const Track: FunctionComponent<TrackingProps> = (props) => {
    const classes = useStyles();

    const [pendingNumber, setPendingNumber] = useState("")
    const [trackingNumber, setTrackingNumber] = useState("")
    const [estDeliveryTimeMinutes, setEstDeliveryTimeMinutes] = useState<number | undefined>(undefined)

    useEffect(() => {
        setTrackingNumber(props.trackingId)
        setEstDeliveryTimeMinutes(props.estTimeMinutes)
    }, [props.trackingId])

    const formatTrackingNumber = () => {
        if (trackingNumber === "") {
            return "Enter a tracking number";
        }
        return "Tracking#: " + trackingNumber;
    }

    const formatEstimatedTime = () => {
        if (estDeliveryTimeMinutes === undefined) {
            return "Est. Delivery: Unknown";
        }
        let now = new Date().getTime() / 1000 / 60;
        let diff = estDeliveryTimeMinutes - now;

        if (diff < 60) {
            return "Est. Delivery: " + diff.toFixed(0) + " minutes";
        }

        let hrs = diff / 60;
        let mins = diff % 60;

        return "Est. Delivery: " + hrs.toFixed(0) + " hrs and " +
            mins.toFixed(0).padStart(2, "0") + " minutes";

    }

    return (
        <React.Fragment>
            <Box display={"flex"} flexDirection={"row"} className={classes.container}
                 justifyContent={"center"}>
                <Grid container className={classes.gridRoot}
                      xs={12}
                      spacing={1}
                      direction={"row"}
                      justify={"flex-start"}
                      alignItems={"stretch"}
                >
                    <Grid item xs={6}>
                        <div className={classes.gridCell}>
                            <Typography className={classes.text}
                                        variant={"h4"}
                                        noWrap>
                                Track your delivery
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={5}>
                        <div className={classes.gridCell}>
                            <ValidatedField {...TrackField} onValidatedChange={e => {
                                if (e.valid) {
                                    setPendingNumber(e.prettyInput)
                                }
                            }}/>
                        </div>
                    </Grid>
                    <Grid item xs={1}>
                        <div className={classes.gridCell}>
                            <IconButton
                                disabled={pendingNumber === ""}
                                onClick={() => {
                                    if (pendingNumber !== "") {
                                        setTrackingNumber(pendingNumber);
                                        setPendingNumber("");
                                    }
                                }}>
                                <GpsFixed/>
                            </IconButton>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.gridCell}>
                            <Typography className={classes.text}
                                        noWrap>
                                {formatTrackingNumber()}
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.gridCell}>
                            <Typography className={classes.text}
                                        noWrap
                                        align={"right"}>
                                {formatEstimatedTime()}
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={classes.gridCell}>
                            <Card className={classes.mediaCard}>
                                <CardMedia
                                    component="img"
                                    alt="Map view"
                                    height="100%"
                                    width={"100%"}
                                    image={require("../../resources/map.png")}
                                    title="Map"
                                />
                            </Card>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>

    );
}