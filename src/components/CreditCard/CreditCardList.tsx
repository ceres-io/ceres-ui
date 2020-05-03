import { makeStyles } from "@material-ui/core/styles";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Button, Card, CardContent, CardHeader, Grid, IconButton, Radio, Snackbar, Typography } from "@material-ui/core";
import { ICreditCard } from "./CreditCard.types";
import { Close, Payment } from "@material-ui/icons";
import { SelectionListProps } from "../SelectionList/SelectionList.Types";

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        width: "100%",
        overflowY: "auto"
    },
    cardContent: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 0,
        paddingBottom: 0,
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

interface ICardMemory {
    card: ICreditCard
    wasSelected: boolean
    index: number
}

function uniqueCCValue(creditCard: ICreditCard | undefined): string | undefined {
    if (creditCard === undefined) {
        return undefined;
    }
    return [creditCard.ccNumber].join(".");
}

export const CreditCardList: FunctionComponent<SelectionListProps<ICreditCard>> = (props) => {
    const classes = useStyles();
    const [selectedCard, setSelectedCard] = useState<ICreditCard | undefined>(undefined)
    const [cards, setCards] = useState<ICreditCard[]>([])
    const [memory, setMemory] = useState<ICardMemory | undefined>(undefined)

    useEffect(() => {
        setSelectedCard(props.selectedItem)
        setCards(props.items)
        console.log(props)
    }, [props.items])

    const handleChange = (creditCard: ICreditCard) => {
        setSelectedCard(creditCard);
        props.onItemSelected(creditCard);
    }

    const handleRemoval = (creditCard: ICreditCard) => {
        // let newList = cards.filter(c => c !== creditCard);
        // setCards(newList);
        if (creditCard === selectedCard) {
            setSelectedCard(undefined)
            props.onItemSelected(undefined)
        }
        props.onItemRemoved([], creditCard)
        setMemory({ card: creditCard, wasSelected: creditCard === selectedCard, index: cards.indexOf(creditCard) })
    }

    const handleToastClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setMemory(undefined)
    }

    const handleCardUndo = () => {
        if (memory === undefined) {
            return;
        }

        let newList = [...(cards.slice(0, memory.index)), memory.card, ...(cards.slice(memory.index, cards.length))];
        setCards(newList);
        if (memory.wasSelected) {
            setSelectedCard(memory.card);
            props.onItemSelected(memory.card);
        }
        setMemory(undefined)
    }

    const ccRadioGroup = () => {
        if (cards.length > 0) {
            return (
                <Grid container xs={12}
                    className={classes.grid}
                    direction='column'
                    spacing={0}
                    justify="center"
                    alignItems="stretch"
                    alignContent="center"
                >
                    {cards.map(creditCard => ccRow(creditCard))}
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

    const ccRow = (creditCard: ICreditCard) => {
        let ccType = detectType(creditCard.ccNumber)
        return (
            <Grid container item
                className={classes.gridRow}
                direction="row"
                spacing={1}
                alignItems="stretch"
            >
                <Grid item>
                    <div className={classes.rowItem}>
                        <Radio
                            checked={selectedCard === creditCard}
                            value={uniqueCCValue(creditCard)}
                            onClick={() => handleChange(creditCard)}
                        />
                    </div>
                </Grid>
                <Grid item>
                    <div className={classes.rowItem}>
                        <Payment htmlColor={ccType.color} />
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
                <Grid item>
                    <div className={classes.rowItem}>
                        <IconButton onClick={() => handleRemoval(creditCard)}>
                            <Close />
                        </IconButton>
                    </div>
                </Grid>
            </Grid>
        );
    }

    return (
        <Card className={classes.root}>
            <CardHeader title={"Your cards"} />
            <CardContent className={classes.cardContent}>
                {ccRadioGroup()}
            </CardContent>
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
                open={memory !== undefined}
                autoHideDuration={4000}
                onClose={handleToastClose}
                message={"Credit card removed"}
                action={
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={handleCardUndo}>
                            UNDO
                        </Button>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleToastClose}>
                            <Close fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
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

