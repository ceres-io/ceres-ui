import React, { FunctionComponent, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Theme, makeStyles, createStyles, Drawer, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBarHeaderProps } from './AppBarHeader.types';
import { RouteNames } from '../../routes/routes';
import { useRouter } from 'react-router5';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { IApplicationStore } from '../../redux/store/store.types';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    },
    zip: {
      marginRight: theme.spacing(4)
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
  const loggedIn = useSelector((store: IApplicationStore) => store.ceres.account.loggedIn);
  const zipCode = useSelector((store: IApplicationStore) => store.ceres.checkout.zip);

  const onShopClick = () => {
    router.navigate(RouteNames.Shop);
  }

  const onLoginClick = () => {
    router.navigate(RouteNames.Login);
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

        {
          zipCode &&
          <Typography variant="body1" className={classes.zip}>
            Shopping for Zip: 22310
          </Typography>
        }

        {!loggedIn && <Button color="inherit" onClick={onLoginClick}>Login</Button>}

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
      </Toolbar>
    </AppBar>
  )
}
