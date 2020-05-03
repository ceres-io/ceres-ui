import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    TextField
} from "@material-ui/core";
import React, {FunctionComponent, useState} from "react";
import {Add} from "@material-ui/icons";
import {IAddress, NewAddressProps} from "./Address.types";
import {IValidFieldProps} from "../ResponsiveTextField/ResponsiveTextField.types";
import {extractNumbers, ValidatedField} from "../ResponsiveTextField/ResponsiveTextField";

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        width: "100%"
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
    textInput: {
        width: "100%"
    },
    title: {
        lineHeight: 1
    },
    actions: {
        float: "right"
    },
    addButton: {
        alignX: "right",
    },
    correctIcon: {
        color: "green"
    }
});

const usStates: string[] = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

export const NewAddressForm: FunctionComponent<NewAddressProps> = (props) => {
    const classes = useStyles();
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [userName, setUserName] = useState("");
    const [city, setCity] = useState("");
    const [usState, setUsState] = useState("");
    const [zipCode, setZipCode] = useState("");

    const formComplete = () => {
        return address1 !== "" &&
            userName !== "" &&
            city !== "" &&
            usState !== "" &&
            zipCode !== ""
    }

    return (
        <Card className={classes.root}>
            <CardHeader title={"Add a new address"}/>
            <CardContent className={classes.cardContent}>
                <Grid container xs={12}
                      className={classes.grid}
                      direction='row'
                      spacing={2}
                      justify="center"
                      alignItems="stretch"
                      alignContent="center"
                >
                    <Grid item xs={12} key={"User name"}>
                        <TextField
                            className={classes.textInput}
                            onChange={(event => {
                                setUserName(event.target.value);
                            })}
                            label={"Name"}
                            type='string'
                            variant='outlined'
                        />
                    </Grid>

                    <Grid item xs={8} key={'Street Address'}>
                        <ValidatedField {...JustBePresent}
                                        label={"Street Address"}
                                        onValidatedChange={(c) => {
                                            if (c.valid) {
                                                setAddress1(c.prettyInput)
                                            } else {
                                                setAddress1("")
                                            }
                                        }}
                        />
                    </Grid>

                    <Grid item xs={4} key={'Address Line 2'}>
                        <TextField
                            className={classes.textInput}
                            onChange={(event => {
                                setAddress2(event.target.value);
                            })}
                            label={"Line 2 (opt)"}
                            type='string'
                            variant='outlined'
                        />
                    </Grid>

                    <Grid item xs={5} key={"City"}>
                        <ValidatedField {...JustBePresent}
                                        label={"City"}
                                        onValidatedChange={(c) => {
                                            if (c.valid) {
                                                setCity(c.prettyInput)
                                            } else {
                                                setCity("")
                                            }
                                        }}/>
                    </Grid>

                    <Grid item xs={3} key={"State"}>
                        <FormControl variant={"outlined"} className={classes.textInput}>
                            <InputLabel id="select-state">State</InputLabel>
                            <Select
                                id={"us-state-select"}
                                labelId="select-state"
                                label={"State"}
                                onChange={event => {
                                    setUsState(event.target.value as string)
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            maxHeight: 36 * 7,
                                        },
                                    },
                                    anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: "left",
                                    },
                                    transformOrigin: {
                                        vertical: "top",
                                        horizontal: "left"
                                    },
                                }}
                            >
                                {
                                    usStates.map(usState =>
                                        <MenuItem value={usState}>{usState}</MenuItem>
                                    )
                                }
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4} key={"Zip"}>
                        <ValidatedField {...ZipProps}
                                        onValidatedChange={(c) => {
                                            if (c.valid) {
                                                setZipCode(c.prettyInput)
                                            } else {
                                                setZipCode("")
                                            }
                                        }}/>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions className={classes.actions}>
                <IconButton className={classes.addButton}
                            disabled={!formComplete()}
                            onClick={() => {
                                let newAddress: IAddress = {
                                    name: userName,
                                    streetAddress: address1,
                                    line2: address2 == "" ? undefined : address2,
                                    city: city,
                                    state: usState,
                                    zip: zipCode
                                }

                                props.onAddressAdded(newAddress)
                            }}
                >
                    <Add/>
                </IconButton>
            </CardActions>
        </Card>
    );
}

const JustBePresent: IValidFieldProps = {
    helperText: "",
    label: "",
    includeCheckMark: false,
    filter: userInput => userInput,
    parse: filtered => filtered,
    prettify: parsedInput => parsedInput,
    isValid: parsedInput => parsedInput != ""
}

const ZipProps: IValidFieldProps = {
    label: "Zip Code",
    includeCheckMark: true,
    helperText: "Zip should be 5 digits",
    filter: userInput => extractNumbers(userInput),
    parse: filtered => filtered,
    prettify: parsedInput => parsedInput.substr(0, 5),
    isValid: parsedInput => parsedInput.length >= 5
}

