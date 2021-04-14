import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import HomeIcon from '@material-ui/icons/Home';
import { green } from '@material-ui/core/colors';
import { useHistory } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: green,
  },
  color: {
    backgroundColor: green,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    minHeight: 148,
    alignItems: 'flex-end',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    color: '#ff6e79',
  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-end',
    paddingBottom: theme.spacing(5),
    fontFamily: 'Nerko One',
    color: '#698399',
  },
}));

export const Nav = (props) => {
  let history = useHistory();
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleHome = (pageURL) => {
    history.push(pageURL);
  };

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (pageURL) => {
    history.push(pageURL);
    setAnchorEl(null);
  };

  return (
    <div className="adminFixed">
      <div className={classes.root} nowrap>
        <AppBar color= "inherit" position="static">
          <Toolbar className={classes.toolbar} nowrap>
            <IconButton
              className="home"
              aria-label="account of current user"
              edge="start"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <MenuIcon />
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
              onClose={() => handleMenuClick(null)}
            >
              <MenuItem onClick={() => handleMenuClick('/')}>
              Search
              </MenuItem>
              <MenuItem onClick={() => handleMenuClick('/TodoItems')}>
                <p> All Items</p>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
};

export default Nav;