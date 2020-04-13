import React, {FunctionComponent, useState} from "react";
import {NewCardProps} from "./NewCard.types";
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid,
    IconButton, InputAdornment,
    makeStyles,
    TextField,
    Tooltip
} from "@material-ui/core";
import {Add, CheckCircle} from "@material-ui/icons";

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
        alignX: "right"
    },
    correctIcon: {
        color: "green"
    }
});

export const NewCreditCardForm: FunctionComponent<NewCardProps> = (props) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardHeader title={"Add a new card"}/>
            <CardContent className={classes.cardContent}>
                <Grid container xs={12}
                      className={classes.grid}
                      direction='row'
                      spacing={2}
                      justify="center"
                      alignItems="stretch"
                      alignContent="center"
                >
                    <Grid item xs={12} key={"Credit Card #"}>
                        <CreditCardField/>
                    </Grid>

                    <Grid item xs={12} key={'Name on Card'}>
                        <Tooltip title={"The card owner's name"}
                                 placement={"top-end"}>
                            <TextField
                                className={classes.textInput}
                                label='Name on Card'
                                value={props.nameOnCard}
                                type='string'
                                variant='outlined'
                            />
                        </Tooltip>
                    </Grid>

                    <Grid item xs={6} key={"Exp. Date"}>
                        <ExpDateField/>
                    </Grid>

                    <Grid item xs={6} key={"CCV"}>
                        <CcvField/>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions className={classes.actions}>
                <IconButton className={classes.addButton}>
                    <Add/>
                </IconButton>
            </CardActions>
        </Card>
    );
};

const CreditCardField: FunctionComponent<any> = () => {
    const classes = useStyles();
    const [hasEdited, setEdited] = useState(false);
    const [hasFocus, setFocus] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [prettyInput, setPrettyInput] = useState("");

    const onInput = (s: string) => {
        setUserInput(s);
        setPrettyInput(prettifyCardNumber(s));
    };

    const parse = (s: string) => {
        return Array.from(s)
            .filter(c => /\d/i.test(c))
            .join("");
    };

    const isErroneous = () => {
        if (hasFocus) {
            return false;
        }

        if (hasEdited) {
            return !cardInputValid();
        }

        return false;
    };

    const cardInputValid = () => {
        let numbers = parse(userInput);
        return numbers.length >= 16;
    };

    const prettifyCardNumber = (s: string) => {
        let numbers = parse(s);
        let size = numbers.length;
        let pretty = numbers.substr(0, 4);

        if (size <= 4) {
            return pretty;
        }

        pretty += "-";
        pretty += numbers.substr(4, 4);

        if (size <= 8) {
            return pretty;
        }

        pretty += "-";
        pretty += numbers.substr(8, 4);

        if (size <= 12) {
            return pretty;
        }

        pretty += "-";
        pretty += numbers.substr(12, 4);
        return pretty;

    };

    const getDisplayValue = () => {
        if (hasFocus || !cardInputValid()) {
            return userInput;
        } else {
            return prettyInput;
        }
    };

    const helperText = () => {
        if (isErroneous()) {
            return "Credit card numbers should be 16 digits (0-9)";
        } else {
            return "";
        }
    };

    const adornment = () => {
        if (cardInputValid() && hasEdited) {
            return {
                endAdornment:
                    <InputAdornment position="end">
                        <CheckCircle className={classes.correctIcon}/>
                    </InputAdornment>
            };
        }
    };

    return (
        <Tooltip title={"Credit card #'s should be 16 digits (0-9)"}
                 placement={"top-end"}>
            <TextField
                className={classes.textInput}
                error={isErroneous()}
                onFocus={(() => setFocus(true))}
                onBlur={() => setFocus(false)}
                onChange={(event => {
                    onInput(event.target.value);
                    setEdited(true);
                })}
                label='Credit Card #'
                value={getDisplayValue()}
                type='string'
                variant='outlined'
                helperText={helperText()}
                InputProps={adornment()}
            />
        </Tooltip>

    );
};

const CcvField: FunctionComponent<any> = () => {
    const classes = useStyles();
    const [hasEdited, setEdited] = useState(false);
    const [hasFocus, setFocus] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [prettyInput, setPrettyInput] = useState("");

    const onInput = (s: string) => {
        setUserInput(s);
        setPrettyInput(prettifyCcv(s));
    };

    const parse = (s: string) => {
        return Array.from(s)
            .filter(c => /\d/i.test(c))
            .join("");
    };

    const isErroneous = () => {
        if (hasFocus) {
            return false;
        }

        if (hasEdited) {
            return !ccvInputValid();
        }

        return false;
    };

    const ccvInputValid = () => {
        let numbers = parse(userInput);
        return numbers.length >= 3;
    };

    const prettifyCcv = (s: string) => {
        let numbers = parse(s);
        return numbers.substr(0, 3);
    };

    const getDisplayValue = () => {
        if (hasFocus || !ccvInputValid()) {
            return userInput;
        } else {
            return prettyInput;
        }
    };

    const helperText = () => {
        if (isErroneous()) {
            return "CCVs should be 3 digits";
        } else {
            return "";
        }
    };

    const adornment = () => {
        if (ccvInputValid() && hasEdited) {
            return {
                endAdornment:
                    <InputAdornment position="end">
                        <CheckCircle className={classes.correctIcon}/>
                    </InputAdornment>
            };
        }
    };

    return (
        <Tooltip title={"3 digit security code on the back of your card"}
                 placement={"top-end"}>
            <TextField
                className={classes.textInput}
                error={isErroneous()}
                onFocus={(() => setFocus(true))}
                onBlur={() => setFocus(false)}
                onChange={(event => {
                    onInput(event.target.value);
                    setEdited(true);
                })}
                label='CCV'
                value={getDisplayValue()}
                type='string'
                variant='outlined'
                helperText={helperText()}
                InputProps={adornment()}
            />
        </Tooltip>

    );

};

const ExpDateField: FunctionComponent<any> = () => {
    const classes = useStyles();
    const [hasEdited, setEdited] = useState(false);
    const [hasFocus, setFocus] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [prettyInput, setPrettyInput] = useState("");
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    const onInput = (s: string) => {
        setUserInput(s);
        setPrettyInput(prettifyDate(s));
    };

    const extractAlphaNum = (s: string) => {
        return Array.from(s)
            .filter(c => /[0-9A-z]/i.test(c))
            .join("");
    };

    const extractMonth = (s: string) => {
        let upperTrim = extractAlphaNum(s).toUpperCase().trim();

        for (let i = 0; i < months.length; i++) {
            let month = months[i];
            if (upperTrim.startsWith(month)) {
                return {monthIdx: i, remainder: upperTrim.replace(month, "")};
            }
        }

        let numbers = extractNumbers(s);
        if (numbers.length > 2) {
            let month = parseInt(numbers.substr(0, 2)) - 1;
            return {monthIdx: month, remainder: numbers.substr(2, numbers.length - 2)}
        }

    };

    const extractNumbers = (s: string) => {
        return Array.from(s)
            .filter(c => /\d/i.test(c))
            .join("");
    };

    const isErroneous = () => {
        if (hasFocus) {
            return false;
        }

        if (hasEdited) {
            return !dateFieldValid();
        }

        return false;
    };

    const dateFieldValid = () => {
        let extractedMonth = extractMonth(userInput);
        if (extractedMonth === undefined) {
            return false;
        }
        let {monthIdx, remainder} = extractedMonth;

        if (monthIdx < 0 || monthIdx >= 12) {
            return false;
        }

        let maybeYear = extractNumbers(remainder);

        return maybeYear.length == 2 || maybeYear.length >= 4;
    };

    const prettifyDate = (s: string) => {
        let extractedMonth = extractMonth(s);
        if (extractedMonth === undefined) {
            return "";
        }
        let {monthIdx, remainder} = extractedMonth;

        if (monthIdx < 0 || monthIdx >= 12) {
            return "";
        }

        let monthName = months[monthIdx];

        let numbers = extractNumbers(remainder);

        let year;
        if (numbers.length == 2) {
            year = 2000 + parseInt(numbers);
        } else if (numbers.length >= 4) {
            year = parseInt(numbers.substr(0, 4));
        } else {
            return "";
        }

        return monthName.charAt(0).toUpperCase() + monthName.slice(1).toLowerCase() + ", " + year;
    };



    const getDisplayValue = () => {
        if (hasFocus || !dateFieldValid()) {
            return userInput;
        } else {
            return prettyInput;
        }
    };

    const helperText = () => {
        if (isErroneous()) {
            return "Date should be MM YY";
        } else {
            return "";
        }
    };

    const adornment = () => {
        if (dateFieldValid() && hasEdited) {
            return {
                endAdornment:
                    <InputAdornment position="end">
                        <CheckCircle className={classes.correctIcon}/>
                    </InputAdornment>
            };
        }
    };

    return (
        <Tooltip title={"Expiration date of your card (month, year)"}
                 placement={"top-end"}>
            <TextField
                className={classes.textInput}
                error={isErroneous()}
                onFocus={(() => setFocus(true))}
                onBlur={() => setFocus(false)}
                onChange={(event => {
                    onInput(event.target.value);
                    setEdited(true);
                })}
                label='Exp. Date'
                value={getDisplayValue()}
                type='string'
                variant='outlined'
                helperText={helperText()}
                InputProps={adornment()}
            />
        </Tooltip>

    );

};