import React, { FunctionComponent, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Theme, makeStyles, createStyles, Drawer, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBarHeaderProps } from './AppBarHeader.types';
import { RouteNames } from '../../routes/routes';
import { useRouter } from 'react-router5';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: 240,
    },
  })
);

interface NavigationOption {
  icon: React.ReactElement
  label: string
  route: string
}

const navOptions: NavigationOption[] = [
  {
    icon: <HomeIcon />,
    label: 'Home',
    route: RouteNames.Home
  },
  {
    icon: <ShoppingCartIcon />,
    label: 'Shop',
    route: RouteNames.Shop
  }
]


// TODO - hide on scroll maybe
export const AppBarHeader: FunctionComponent<AppBarHeaderProps> = (props: AppBarHeaderProps) => {

  const classes = useStyles();
  const router = useRouter();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const onShopClick = () => {
    router.navigate(RouteNames.Shop);
  }

  const onNavigationOptionClick = (option: NavigationOption) => {
    router.navigate(option.route)
    setDrawerOpen(false)
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Ceres
        </Typography>

        <Button color='inherit' onClick={onShopClick}>Shop Now</Button>

        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar}>
            <List>
              {navOptions.map(o =>
                <ListItem
                  button
                  key={o.label}
                  onClick={() => onNavigationOptionClick(o)}
                >
                  <ListItemIcon>{o.icon}</ListItemIcon>
                  <ListItemText primary={o.label} />
                </ListItem>
              )}
            </List>
          </div>
        </Drawer>

        {/* {props.firstName === undefined &&
          <Button color="inherit" onClick={props.onSignUp}>Sign Up</Button>}
        {props.firstName !== undefined &&
          <Button color="inherit" onClick={props.onLogin}>Login</Button>} */}

      </Toolbar>
    </AppBar>
  )
}
