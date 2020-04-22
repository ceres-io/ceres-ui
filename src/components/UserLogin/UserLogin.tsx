import React from 'react';
import { Card, CardContent, CardHeader, Grid, makeStyles, TextField, Container, Avatar, LockOutlinedIcon} from "@material-ui/core"

const useStyles = makeStyles({

    root:{
           maxWidth:500,
           minHeight: 500,
           background: 'linear-gradient(60deg, #EEEEEE 30%, #E0E0E0 100%)'
        },
    grid: {
        margin: 0
        },
})




export function SignIn() {
const classes = useStyles()
  return (
  <Card className={classes.root}>
    <CardHeader title={"Login"} style={{textAlign:'center'}} />
     <Avatar>
     <LockOutlinedIcon/>
     </Avatar>
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
    </Container>
  </Card>

  );
}