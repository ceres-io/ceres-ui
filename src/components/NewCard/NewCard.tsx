import React, {FunctionComponent} from "react";
import {NewCardProps} from "./NewCard.types";
import {Card, CardActions, CardContent, CardHeader, Grid, IconButton, makeStyles, TextField} from "@material-ui/core";
import {Add} from "@material-ui/icons";

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
                        <TextField
                            className={classes.textInput}
                            label='Credit Card #'
                            value={props.cardNumber}
                            type='string'
                            variant='outlined'
                        />
                    </Grid>

                    <Grid item xs={12} key={'Name on Card'}>
                        <TextField
                            className={classes.textInput}
                            label='Name on Card'
                            value={props.nameOnCard}
                            type='string'
                            variant='outlined'
                        />
                    </Grid>

                    <Grid item xs={6} key={"Exp. Date"}>
                        <TextField
                            className={classes.textInput}
                            label='Exp. Date'
                            value={props.expirationDate}
                            type='string'
                            variant='outlined'
                        />
                    </Grid>

                    <Grid item xs={6} key={"CCV"}>
                        <TextField
                            className={classes.textInput}
                            label='CCV'
                            value={props.ccv}
                            type='string'
                            variant='outlined'
                        />
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