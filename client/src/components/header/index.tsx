import { useState, MouseEvent, useEffect } from 'react'

import { Link } from "react-router-dom";
import logo from "@assets/image/icon-popcorn-svgrepo-com copy.svg";
import "./header.css";
import { Avatar, Button, MenuItem, Menu } from '@mui/material';
import { getLocalStorage } from '@base/index';
import { detailsUser } from '@config/api/user';
import { LOGIN_STORAGE_KEY } from '@base/constant'

function Header() {
  const [user, setUser] = useState<any>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);


  let token = getLocalStorage(LOGIN_STORAGE_KEY);

  useEffect(() => {
    const fetchDetailUser = async () => {
      token && await detailsUser(token).then(res => {
        setUser(res.data)
      })
    }
    fetchDetailUser();
  }, [token]
  )

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    localStorage.removeItem('login');
    location.href = "/";
  }


  return (
    <header id="header">
      <div className="container mx-auto">
        <div className="header__content">
          <div className="header__logo">
            <Link to="/">
              <img className="logo-img" src={logo} alt="logo" />
            </Link>
          </div>
          <nav>
            <ul className="navs">
              <li className="navs-items">
                <Link className="navs-link active" to={"/"}>
                  Buy Tickets
                </Link>
              </li>
              <li className="navs-items">
                <Link className="navs-link" to={"/"}>
                  Movies & Shows
                </Link>
              </li>
              <li className="navs-items">
                <Link className="navs-link" to={"/"}>
                  Support
                </Link>
              </li>
              <li className="navs-items">
                <Link className="navs-link" to={"/"}>
                  Subscriptions
                </Link>
              </li>
              <li className="navs-items">
                <Link className="navs-link" to={"/login"}>
                  Login
                </Link>
              </li>
            </ul>
          </nav>

          <div className="footer__login">
            <Button onClick={e => handleClick(e)}>
              <Avatar src={user ? user.avatar : null}>
              </Avatar>
            </Button>

            <Menu
              id="account-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 30,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
              <MenuItem><i className="fa-regular fa-id-card mr-2"></i>Profile</MenuItem>
              <MenuItem><i className="fa-solid fa-ticket mr-2"></i>Ticket</MenuItem>
              <MenuItem onClick={handleLogOut}> <i className="fa-solid fa-right-from-bracket mr-2"></i>Log Out</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </header >
  );
}

export default Header;
1