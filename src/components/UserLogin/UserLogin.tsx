import React, { FunctionComponent, useState } from 'react';
import { Card, CardHeader, Grid, makeStyles, createStyles, TextField, Container, Theme, Button, Link } from "@material-ui/core"
import { useDispatch } from 'react-redux';
import { LoginAction } from '../../redux/actions/AccountAction';
import { useRouter } from 'react-router5';
import { RouteNames } from '../../routes/routes';


const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    maxWidth: 500,
    minHeight: 300,
    // background: 'linear-gradient(60deg, #EEEEEE 30%, #E0E0E0 100%)',
  },
  content: {
    paddingTop: theme.spacing(2)
  },
  grid: {
    margin: 0
  }
}))


//TODO
function onClickSignUpHandler() { }

//TODO
function onChangeRememberMeHandler() { }

export const UserLogin: FunctionComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const [username, setUsername] = useState('');

  const onLoginClick = () => {
    dispatch(new LoginAction({ username }))
    router.navigate(RouteNames.History)
  }

  const onUsernameBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }


  return (
    <Card className={classes.root}>
      <CardHeader title={"Login"} style={{ textAlign: 'center' }} />
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
            autoFocus
            onBlur={onUsernameBlur}
          />
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
            <Button
              variant="contained"
              fullWidth
              color="primary"
              onClick={onLoginClick}
            >
              Login
            </Button>
            <Grid container className={classes.content}>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Card>

  );
}