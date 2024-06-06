import logo from "@assets/image/icon-popcorn-svgrepo-com copy.svg";
import { Link, NavLink } from "react-router-dom";
import { useState, MouseEvent, useEffect } from 'react'
import { Avatar, Button, MenuItem, Menu } from '@mui/material';
/* */
import { detailsUser } from '@config/api/user';
import { getSessionStorage } from '@base/index';
import { LOGIN_STORAGE_KEY } from '@base/constant';
import "./header.css";

function Header() {
  const [user, setUser] = useState<any>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  let token = getSessionStorage(LOGIN_STORAGE_KEY);

  useEffect(() => {
    const fetchDetailUser = async () => {
      token && await detailsUser(token).then(res => {
        setUser(res.data)
      })
    }
    fetchDetailUser();
  }, [token]
  )

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }


  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    sessionStorage.removeItem('login');
    window.location.href = "/login";
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
          {/* navs */}
          <ul id="navs" className="navs">
            <li className="navs-items">
              <NavLink className={({ isActive }) => {
                return isActive ? "navs-link active" : "navs-link";
              }} to={"/ticket"}>
                <i className="fa-solid fa-ticket mr-1"></i>  Buy Tickets
              </NavLink>
            </li>
            <li className="navs-items">
              <NavLink className={({ isActive }) => {
                return isActive ? "navs-link active" : "navs-link";
              }} to={"/"}>
                <i className="fa-solid fa-ticket mr-1"></i>  Movies & Shows
              </NavLink>
            </li>

            <li className="navs-items">
              <NavLink className={({ isActive }) => {
                return isActive ? "navs-link active" : "navs-link";
              }} to={"/suppport"}>
                <i className="fa-solid fa-headset mr-1"></i>  Support
              </NavLink>
            </li>
            <li className="navs-items">
              <NavLink className={({ isActive }) => {
                return isActive ? "navs-link active" : "navs-link";
              }} to={"/signup"}>
                <i className="fa-solid fa-user-plus mr-1"></i>Subscriptions
              </NavLink>
            </li>
            {!user && <li className="navs-items">
              <NavLink className={({ isActive }) => {
                return isActive ? "navs-link active" : "navs-link";
              }} to={"/login"}>
                <i className="fa-regular fa-address-card mr-1"></i>  Login
              </NavLink>
            </li>}
          </ul>

          {/* login */}
          {user && <div className="header__login">
            <Button onClick={e => handleOpenMenu(e)}>
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
          </div>}
        </div>
        <button className="nav-bar" onClick={() => {
          document.querySelector("#navs")?.classList.toggle("show");
        }
        } type="button">
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
    </header >
  );
}

export default Header;
1