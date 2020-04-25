import {makeStyles} from "@material-ui/core/styles";
import React, {FunctionComponent, useState} from "react";
import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    Radio,
    Typography
} from "@material-ui/core";
import {ICreditCard} from "./CreditCard.types";
import {Payment} from "@material-ui/icons";
import {SelectionListProps} from "../SelectionList/SelectionList.Types";

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
    gridRow: {
        margin: 0,
    },
    radioLabel: {
        width: "100%",
    },
    title: {
        lineHeight: 1
    },
    nameLabel: {},
    endingIn: {
        color: "gray"
    },
    last4Digits: {},
    rowItem: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center"
    }
})

function uniqueCCValue(creditCard: ICreditCard | undefined): string | undefined {
    if (creditCard === undefined) {
        return undefined;
    }
    return [creditCard.ccNumber].join(".");
}

export const CreditCardList: FunctionComponent<SelectionListProps<ICreditCard>> = (props) => {
    const classes = useStyles();
    const [selectedCard, setSelectedCard] = useState(props.selectedItem)

    const handleChange = (creditCard: ICreditCard) => {
        setSelectedCard(creditCard);
        props.onItemSelected(creditCard);
    }

    const ccRadioGroup = () => {
        if (props.items.length > 0) {
            return (
                <Grid container xs={12}
                      className={classes.grid}
                      direction='column'
                      spacing={0}
                      justify="center"
                      alignItems="stretch"
                      alignContent="center"
                >
                    {props.items.map(creditCard => CreditCardRow(creditCard, selectedCard, handleChange))}
                </Grid>
            );
        } else {
            return (
                <Typography>
                    Please add a new card
                </Typography>
            );
        }
    }

    return (
        <Card className={classes.root}>
            <CardHeader title={"Your cards"}/>
            <CardContent className={classes.cardContent}>
                {ccRadioGroup()}
            </CardContent>
        </Card>
    )
}

const detectType = (cardNumber: string) => {
    if (cardNumber.startsWith("4")) {
        return ({
            name: "VISA",
            color: "blue",
        })
    }
    if (cardNumber.startsWith("5")) {
        return ({
            name: "MasterCard",
            color: "orange",
        })
    }
    if (cardNumber.startsWith("6")) {
        return ({
            name: "Discover",
            color: "red",
        })
    }
    if (cardNumber.startsWith("34") || cardNumber.startsWith("37")) {
        return ({
            name: "American Express",
            color: "darkGrey",
        })
    }
    return ({
        name: "Card",
        color: "black"
    })
}

const CreditCardRow = (creditCard: ICreditCard,
                       selectedCard: ICreditCard | undefined,
                       handleChange: (c: ICreditCard) => void) => {
    const classes = useStyles()
    const [hasHover, setHover] = useState(false)
    let ccType = detectType(creditCard.ccNumber)

    const getText = () => {
        if (hasHover) {
            return creditCard.nameOnCard
        } else {
            return ccType.name
        }
    }

    return (
        <Grid container item
              className={classes.gridRow}
              direction="row"
              spacing={1}
              alignItems="stretch"
              onMouseEnter={e => setHover(true)}
              onMouseLeave={e => setHover(false)}
              onClick={() => handleChange(creditCard)}
        >
            <Grid item>
                <div className={classes.rowItem}>
                    <Radio
                        checked={selectedCard === creditCard}
                        value={uniqueCCValue(creditCard)}
                    />
                </div>
            </Grid>
            <Grid item>
                <div className={classes.rowItem}>
                    <Payment htmlColor={ccType.color}/>
                </div>
            </Grid>
            <Grid item xs zeroMinWidth alignItems={"center"}>
                <div className={classes.rowItem}>
                    <Typography noWrap>
                        {ccType.name}
                    </Typography>
                </div>
            </Grid>
            <Grid item>
                <div className={classes.rowItem}>
                    <Typography className={classes.endingIn} variant={"subtitle2"}>
                        ending in
                    </Typography>
                </div>
            </Grid>
            <Grid item>
                <div className={classes.rowItem}>
                    <Typography className={classes.last4Digits} variant={"h6"}>
                        {creditCard.ccNumber.substr(creditCard.ccNumber.length - 4, 4)}
                    </Typography>
                </div>
            </Grid>
        </Grid>
    );
}