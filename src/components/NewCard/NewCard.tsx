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
        alignX: "right",
    },
    correctIcon: {
        color: "green"
    }
});

export const NewCreditCardForm: FunctionComponent<NewCardProps> = () => {
    const classes = useStyles();
    const [ccNumber, setCcNumber] = useState("");
    const [userName, setUserName] = useState("");
    const [expDate, setExpDate] = useState("");
    const [ccvCode, setCcvCode] = useState("");

    const formComplete = () => {
        return ccNumber != "" &&
            userName != "" &&
            expDate != "" &&
            ccvCode != "";
    }

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
                        <ValidatedField {...CreditCardProps}
                                        onValidatedChange={(c) => {
                                            if (c.valid) {
                                                setCcNumber(c.prettyInput)
                                            } else {
                                                setCcNumber("");
                                            }
                                        }}/>
                    </Grid>

                    <Grid item xs={12} key={'Name on Card'}>
                        <TextField
                            className={classes.textInput}
                            onChange={(event => {
                                setUserName(event.target.value);
                            })}
                            label={"Name on Card"}
                            type='string'
                            variant='outlined'
                        />
                    </Grid>

                    <Grid item xs={6} key={"Exp. Date"}>
                        <ValidatedField {...ExpDateProps}
                                        onValidatedChange={(c) => {
                                            if (c.valid) {
                                                setExpDate(c.prettyInput)
                                            } else {
                                                setExpDate("");
                                            }
                                        }}/>
                    </Grid>

                    <Grid item xs={6} key={"CCV"}>
                        <ValidatedField {...CcvProps}
                                        onValidatedChange={(c) => {
                                            if (c.valid) {
                                                setCcvCode(c.prettyInput)
                                            } else {
                                                setCcvCode("");
                                            }
                                        }}/>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions className={classes.actions}>
                <IconButton className={classes.addButton}
                            disabled={!formComplete()}
                            onClick={() => console.log({ccNumber,
                                userName,
                                expDate,
                                ccvCode})}
                >
                    <Add/>
                </IconButton>
            </CardActions>
        </Card>
    );
};

interface IValidFieldProps {
    label: string;
    includeCheckMark: boolean;
    helperText: string;
    filter: (userInput: string) => string;
    parse: (userInput: string) => string;
    prettify: (parsedInput: string) => string;
    isValid: (parsedInput: string) => boolean;
}

interface ValidatedChange {
    prettyInput: string;
    valid: boolean;
}

interface IValidFieldEvents {
    onValidatedChange: (change: ValidatedChange) => void;
}

const ValidatedField: FunctionComponent<IValidFieldProps & IValidFieldEvents> = (props) => {
    const classes = useStyles();
    const [hasEdited, setEdited] = useState(false);
    const [hasFocus, setFocus] = useState(false);
    const [wasWrong, setWrong] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [parsedInput, setParsedInput] = useState("");
    const [prettyInput, setPrettyInput] = useState("");

    const onInput = (userInput: string) => {
        let filtered = props.filter(userInput);
        setUserInput(filtered);

        let parsed = props.parse(filtered);
        setParsedInput(parsed);

        let pretty = props.prettify(parsed);
        setPrettyInput(pretty);

        return {
            prettyInput: pretty,
            valid: props.isValid(parsed)
        }
    }

    const isErroneous = () => {
        if (hasFocus) {
            return wasWrong && !props.isValid(parsedInput);
        }

        if (hasEdited) {
            return !props.isValid(parsedInput);
        }

        return false;
    }

    const displayValue = () => {
        if (hasFocus || !props.isValid(parsedInput)) {
            return userInput;
        } else {
            return prettyInput;
        }
    }

    const helperText = () => {
        if (isErroneous()) {
            return props.helperText;
        } else {
            return "";
        }
    }

    const adornment = () => {
        if (props.isValid(parsedInput) && hasEdited && props.includeCheckMark) {
            return {
                endAdornment:
                    <InputAdornment position="end">
                        <CheckCircle className={classes.correctIcon}/>
                    </InputAdornment>
            };
        }
    }

    const tooltip = () => {
        if (!isErroneous() && !hasFocus && userInput != prettyInput) {
            return "Your input was formatted. Edit to see your original input."
        }
        return "";
    }

    const label = () => props.label;

    return (
        <Tooltip title={tooltip()}
                 placement={"top-end"}>
            <TextField
                className={classes.textInput}
                error={isErroneous()}
                onFocus={(() => setFocus(true))}
                onBlur={() => {
                    setFocus(false)
                    if (hasEdited) {
                        if (props.isValid(parsedInput)) {
                            setWrong(false)
                        } else {
                            setWrong(true)
                        }
                    }
                }}
                onChange={(event => {
                    let out: ValidatedChange = onInput(event.target.value);
                    setEdited(true);
                    props.onValidatedChange(out);
                })}
                label={label()}
                value={displayValue()}
                type='string'
                variant='outlined'
                helperText={helperText()}
                InputProps={adornment()}
            />
        </Tooltip>

    );
}

/* Some utility functions for parsing numbers and numbers+strings from user input */
function extractNumbers(s: string): string {
    return Array.from(s)
        .filter(c => /\d/i.test(c))
        .join("")
}

function extractAlphaNum(s: string): string {
    return Array.from(s)
        .filter(c => /[0-9A-z]/i.test(c))
        .join("")
}

function removeAlphas(s: string): string {
    return Array.from(s)
        .filter(c => /[^A-z]/i.test(c))
        .join("")
}

const CreditCardProps: IValidFieldProps = {
    label: "Credit Card #",
    includeCheckMark: true,
    helperText: "Credit card numbers should be 16 digits (0-9)",
    filter: (userInput) => removeAlphas(userInput),
    parse: (filtered: string) => extractNumbers(filtered),
    prettify: (parsedInput: string) => {
        let result = parsedInput.substr(0, 4);
        for (let i = 4; i < Math.min(16, parsedInput.length); i += 4) {
            result += " - " + parsedInput.substr(i, 4);
        }
        return result;
    },
    isValid: (parsedInput: string) => {
        return (parsedInput.length >= 16);
    }
}

const CcvProps: IValidFieldProps = {
    label: "CCV #",
    includeCheckMark: true,
    helperText: "The 3 digit security code on the back of your card",
    filter: userInput => removeAlphas(userInput),
    parse: filtered => extractNumbers(filtered),
    prettify: parsedInput => parsedInput.substr(0, 3),
    isValid: parsedInput => {
        return parsedInput.length >= 3;
    }
}

const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

interface IParsedDateInput {
    monthIndex: number,
    remainingInput: string
}

function extractMonth(parsedInput: string): IParsedDateInput | undefined {
    let upperTrim = extractAlphaNum(parsedInput).toUpperCase().trim();

    for (let i = 0; i < months.length; i++) {
        let month = months[i];
        if (upperTrim.startsWith(month)) {
            return {monthIndex: i, remainingInput: upperTrim.replace(month, "")};
        }
    }

    let numbers = extractNumbers(parsedInput);
    if (numbers.length > 2) {
        let month = parseInt(numbers.substr(0, 2)) - 1;
        return {monthIndex: month, remainingInput: numbers.substr(2, numbers.length - 2)}
    }
}

const ExpDateProps: IValidFieldProps = {
    label: "Exp. Date",
    includeCheckMark: true,
    helperText: "Date should be MM YY",
    filter: userInput => userInput,
    parse: filtered => extractAlphaNum(filtered),
    prettify: parsedInput => {
        let extractedMonth = extractMonth(parsedInput);
        if (extractedMonth === undefined) {
            return "";
        }
        let monthIdx = extractedMonth.monthIndex;
        let remainder = extractedMonth.remainingInput;

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
    },

    isValid: parsedInput => {
        let extractedMonth = extractMonth(parsedInput);
        if (extractedMonth === undefined) {
            return false;
        }
        let monthIdx = extractedMonth.monthIndex;
        let remainder = extractedMonth.remainingInput;

        if (monthIdx < 0 || monthIdx >= 12) {
            return false;
        }

        let maybeYear = extractNumbers(remainder);

        return maybeYear.length == 2 || maybeYear.length >= 4;
    }
}