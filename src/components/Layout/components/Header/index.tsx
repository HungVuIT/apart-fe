import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import './header.scss';
import { getAccessToken } from '../../../../untils/localStorage';
const items = ['Đồng hồ', 'Best selling', 'Nam', 'Nữ', 'Smartwatch', 'Cặp đôi', 'Tin tức'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Header() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const token = getAccessToken();
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
            ? <Box sx={{ flexGrow: 0 }} className='header-avt'>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            : <div className='btn__wrapper'>
              <Button variant="contained" className='header-btn'>Đăng nhập</Button>
              <Button variant="contained" className='header-btn'>Đăng ký</Button>
            </div>
          }
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default Header;
