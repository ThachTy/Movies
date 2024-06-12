import logo from "@assets/image/icon-popcorn-svgrepo-com copy.svg";
import { Link, NavLink } from "react-router-dom";
import { useState, MouseEvent, useEffect, useContext } from 'react'
import { Avatar, Button, MenuItem, Menu } from '@mui/material';
import { useTranslation } from 'react-i18next'
/* */
import { detailsUser } from '@config/api/user';
import { getSessionStorage } from '@base/index';
import { LOGIN_STORAGE_KEY } from '@base/constant';
import { AuthContext } from '@context/AuthContext'
import "./header.css";

function Header() {
  const { t } = useTranslation(["header"]);
  const [user, setUser] = useState<any>(null);


  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { handleLogout, token }: any = useContext(AuthContext);

  useEffect(() => {
    let newToken = getSessionStorage(LOGIN_STORAGE_KEY) ?? token;
    const fetchDetailUser = async () => {
      newToken && await detailsUser(newToken).then(res => {
        setUser(res.data)
      })
    }
    fetchDetailUser();
  }, [token, getSessionStorage(LOGIN_STORAGE_KEY)]
  )

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

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
                <i className="fa-solid fa-ticket fa-fade mr-2"></i>  {t('buy')}
              </NavLink>
            </li>
            <li className="navs-items">
              <NavLink className={({ isActive }) => {
                return isActive ? "navs-link active" : "navs-link";
              }} to={"/"}>
                <i className="fa-solid fa-film fa-shake mr-2"></i>{t('movie')}
              </NavLink>
            </li>

            <li className="navs-items">
              <NavLink className={({ isActive }) => {
                return isActive ? "navs-link active" : "navs-link";
              }} to={"/suppport"}>
                <i className="fa-solid fa-headset fa-shake mr-2"></i>  {t('suport')}
              </NavLink>
            </li>
            <li className="navs-items">
              <NavLink className={({ isActive }) => {
                return isActive ? "navs-link active" : "navs-link";
              }} to={"/signup"}>
                <i className="fa-solid fa-user-plus fa-shake mr-2"></i>{t('subcription')}
              </NavLink>
            </li>
            {!user && <li className="navs-items">
              <NavLink className={({ isActive }) => {
                return isActive ? "navs-link active" : "navs-link";
              }} to={"/login"}>
                <i className="fa-regular fa-address-card fa-shake mr-2"></i>  {t('login')}
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
              <MenuItem onClick={handleLogout}> <i className="fa-solid fa-right-from-bracket mr-2"></i>Log Out</MenuItem>
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