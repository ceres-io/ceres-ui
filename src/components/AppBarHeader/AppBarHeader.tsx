import React, { FunctionComponent, useState, useRef } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Theme, makeStyles, createStyles, Drawer, List, ListItem, ListItemText, ListItemIcon, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBarHeaderProps } from './AppBarHeader.types';
import { RouteNames } from '../../routes/routes';
import { useRouter } from 'react-router5';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { IApplicationStore } from '../../redux/store/store.types';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
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
    profileIcon: {
      color: 'white'
    }
  })
);

interface NavigationOption {
  icon?: React.ReactElement
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

const profileOptions: NavigationOption[] = [
  {
    label: 'History',
    route: RouteNames.History
  }
]


// TODO - hide on scroll maybe
export const AppBarHeader: FunctionComponent<AppBarHeaderProps> = (props: AppBarHeaderProps) => {

  const classes = useStyles();
  const router = useRouter();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const loggedIn = useSelector((store: IApplicationStore) => store.ceres.account.loggedIn);
  const zipCode = useSelector((store: IApplicationStore) => store.ceres.checkout.zip);

  const onLoginClick = () => {
    router.navigate(RouteNames.Login);
  }

  const onProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    setProfileMenuOpen(true);
  }

  const closeProfileMenu = () => {
    setProfileMenuOpen(false);
  }

  const onNavigationOptionClick = (option: NavigationOption) => {
    router.navigate(option.route)
    setDrawerOpen(false)
    setProfileMenuOpen(false)
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
            {"Shopping for Zip: " + zipCode}
          </Typography>
        }

        {loggedIn ?
          <Button color="inherit" onClick={onLoginClick}>Login</Button>
          :
          <IconButton className={classes.profileIcon} onClick={onProfileClick}>
            <AccountCircleIcon fontSize='large' />
          </IconButton>
        }

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

        <Menu
          id='menu-appbar'
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={profileMenuOpen}
          onClose={closeProfileMenu}
        >
          {profileOptions.map(o =>
            <MenuItem onClick={() => onNavigationOptionClick(o)}>
              {o.label}
            </MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
