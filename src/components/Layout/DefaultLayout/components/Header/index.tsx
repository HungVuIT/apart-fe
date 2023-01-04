import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { getAccessToken } from '../../../../../untils/localStorage';
import { useLocation, useNavigate } from 'react-router-dom';
import { MyGlobalContext } from '../../../../../store/context/MyglobalContext';
import './header.scss';
const items = ['Đồng hồ', 'Best selling', 'Nam', 'Nữ', 'Smartwatch', 'Cặp đôi', 'Tin tức'];

function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const locationUrl = useLocation();
  const token = getAccessToken();
  const navigate = useNavigate();
  const { setNowUrl } = React.useContext(MyGlobalContext);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickLogin = () => {
    setNowUrl(locationUrl.pathname.toString());
    navigate('/auth/login');
  };
  return (
    <div className='header__layout'>
      <AppBar position="static" className='header__wrapper'>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              className='header__logo'
            >
              D&H
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} className='nav-btn-item'>
              {items.map((item) => (
                <Button
                  key={item}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  className='menu-item'
                >
                  {item}
                </Button>
              ))}
            </Box>

            {token
              ? <ShoppingCartIcon className='shopping-cart'/>
              : <>
              <div className='btn__wrapper'>
                <Button variant="contained" className='header-btn' onClick={handleClickLogin}>Đăng nhập</Button>
                <Button variant="contained" className='header-btn'>Đăng ký</Button>
              </div>
              <div className='btn-avt'>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  className='btn-icon'
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Đăng nhập</MenuItem>
                  <MenuItem onClick={handleClose}>Đăng ký</MenuItem>
                </Menu>
              </div>
            </>

          }
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default Header;
