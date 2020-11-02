import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { actionCreator, LOGGEDOUT } from '../config/actions'
import { useHistory } from "react-router-dom";
import localforage from 'localforage'
import Cookies from 'universal-cookie';
import { useGlobalStore } from '../Provider';
 
const cookies = new Cookies();


const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    width: '100%'
  },
  menu: {
    [theme.breakpoints.down('md')]: {
      width: 150,
      height: 80
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header () {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory()
  const { state, dispatch } = useGlobalStore()

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const logout = () => {
    handleClose()
    localforage.removeItem('twit_login').then(function(value) {
        cookies.remove('twit_token')
        dispatch(actionCreator(LOGGEDOUT))
        history.push('/login')
    }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
    });
    

  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {state.User.name}
          </Typography>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem className={classes.menu} onClick={logout}>Logout</MenuItem>
                <MenuItem className={classes.menu} onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
export const MemoHeader =  memo(Header)