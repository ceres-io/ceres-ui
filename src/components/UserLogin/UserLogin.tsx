import React from 'react';
import { Card, CardContent, CardHeader, Grid, makeStyles, TextField, Container, Avatar, LockOutlinedIcon, Button, FormControlLabel, Checkbox} from "@material-ui/core"
import LockIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles({

    root:{
           maxWidth:500,
           minHeight: 300,
           background: 'linear-gradient(60deg, #EEEEEE 30%, #E0E0E0 100%)'
        },
    grid: {
        margin: 0
        },
})

//TODO
function onClickLoginHandler(){}

//TODO
function onClickSignUpHandler(){}

//TODO
function onChangeRememberMeHandler(){}

export function SignIn() {
const classes = useStyles()
  return (
  <Card className={classes.root}>
    <CardHeader title={"Login"} style={{textAlign:'center'}} />
       <Grid
         container
         direction="column"
         justify="space-between"
         alignItems="center"
       >
        <Container maxWidth='xs'>
        <TextField
            variant="outlined"
            margin="none"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus/>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            />
            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="center"
            >
            <Button variant="contained" color="primary" onClick={onClickLoginHandler}>
              Sign In
            </Button>
             <Button variant="contained" color="primary" onClick={onClickSignUpHandler}>
                          New Here? Sign Up Now!
             </Button>

            </Grid>
            <FormControlLabel
                           control={<Checkbox value="remember" color="primary" onChange={onChangeRememberMeHandler}/>}
                           label="Remember me"/>
    </Container>
    </Grid>
  </Card>

  );
}