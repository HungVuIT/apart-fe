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

import Dialog from '@mui/material/Dialog';
import './header.scss';
import LoginModal from '../../../../../pages/common/auth/LoginModal';
import { getCart, getFavoriteList, getProfile } from '../../../../../redux/user/userThunk';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import AccountMenu from '../AccountMenu';
import { getListOfShop } from '../../../../../redux/common/commonThunk';
import { ROLE } from '../../../../../interface/user/enum';
import { getProfileShop } from '../../../../../redux/vendor/vendorThunk';
const items = ['Trang chủ', 'Liên Hệ', 'Tin tức'];
interface IProps {
  setLoadingPage: any
}
function Header({ setLoadingPage }: IProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { isOpenLogin, setIsOpenLogin, isLogin, setIsLogin, loading, setLoading } = React.useContext(MyGlobalContext);
  const token = getAccessToken();
  const navigate = useNavigate();
  const { profile } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (getAccessToken()) {
      dispatch(getFavoriteList());
    }
  }, []);
  React.useEffect(() => {
    if (getAccessToken()) {
      getAllOfMe();
    }
  }, []);

  React.useEffect(() => {
    dispatch(getListOfShop());
  }, []);
  React.useEffect(() => {
    if (profile.role === ROLE.VENDOR) {
      dispatch(getProfileShop());
    }
  }, [profile.role]);
  const getAllOfMe = async () => {
    setLoadingPage(true);
    if (!profile || !profile.email) {
      await dispatch(getProfile());
    }
    await dispatch(getCart());
    setLoadingPage(false);
  };
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickLogin = (_isLogin: boolean) => {
    setIsOpenLogin(true);
    setIsLogin(_isLogin);
  };
  const handleCloseLogin = () => {
    !loading && setIsOpenLogin(false);
  };
  const handleClickItem = (item: any) => {
    if (item === 'Trang chủ') {
      navigate('/');
    } else if (item === 'Tin tức') {
      navigate('/news');
    } else {
      navigate('/contact');
    }
    window.scrollTo(0, 0);
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
              onClick={() => navigate('/')}
              className='header__logo'
              style={{
                cursor: 'pointer'
              }}
            >
              Apart
            </Typography>
            <Box sx={{ flexGrow: 1 }} className='nav-btn-item'>
              {items.map((item) => (
                <Button
                  key={item}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  className='menu-item'
                  onClick={() => handleClickItem(item)}
                >
                  {item}
                </Button>
              ))}
            </Box>

            {token
              ? <div className='user-group'>
                <AccountMenu />
              </div>
              : <>
              <div className='btn__wrapper'>
                <Button variant="contained" className='header-btn' onClick={() => handleClickLogin(true)}>Đăng nhập</Button>
                <Dialog open={isOpenLogin} onClose={handleCloseLogin} className='dialog-login'>
                  <LoginModal isLogin={isLogin} onClose={handleCloseLogin} loading={loading} setLoading={setLoading}/>
                </Dialog>
                <Button variant="contained" className='header-btn' onClick={() => handleClickLogin(false)}>Đăng ký</Button>
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
                  <MenuItem onClick={() => handleClickLogin(true)}>Đăng nhập</MenuItem>
                  <MenuItem onClick={() => handleClickLogin(false)}>Đăng ký</MenuItem>
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
