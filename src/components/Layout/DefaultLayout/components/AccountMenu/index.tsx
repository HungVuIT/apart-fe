import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import ViewListIcon from '@mui/icons-material/ViewList';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import StorefrontIcon from '@mui/icons-material/Storefront';
import defaultAvt from '../../../../../assets/img/default-avt.png';
import classes from './menu.module.scss';
import { removeAccessToken, removeRefreshToken } from '../../../../../untils/localStorage';
import { useNavigate } from 'react-router-dom';
import { MenuItemName } from '../../../../../interface/enum';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { ROLE } from '../../../../../interface/user/enum';
import MuseumIcon from '@mui/icons-material/Museum';
import { getProfileShop } from '../../../../../redux/vendor/vendorThunk';
function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { profile, cart } = useAppSelector((state) => state.user);
  const { shop } = useAppSelector((state) => state.vendor);
  const dispatch = useAppDispatch();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  React.useEffect(() => {
    if (!shop.id) {
      dispatch(getProfileShop());
    }
  }, []);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    removeAccessToken();
    removeRefreshToken();
    window.location.reload();
  };
  const handleClickMenu = (_name: MenuItemName) => {
    switch (_name) {
      case MenuItemName.LOGOUT:
        handleLogout();
        break;
      case MenuItemName.PROFILE:
        navigate('/user/profile');
        break;
      case MenuItemName.MANAGER:
        shop.id && navigate(`/shop/${shop.id}`);
        break;
      case MenuItemName.FAVEORITE_LIST:
        navigate('/user/favorite-list');
        break;
      case MenuItemName.ORDER:
        navigate('/user/order');
        break;
      case MenuItemName.CREATE:
        navigate('/shop/register');
        break;
      case MenuItemName.SHOP:
        navigate('/shop/manager/watch');
        break;
    }
  };
  const handleClickCart = () => {
    window.scrollTo(0, 0);
    navigate('/user/cart');
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', right: '20px' }}>
        <div className={classes['cart-group']}>
          <ShoppingCartIcon className='shopping-cart' onClick={handleClickCart}/>
          <div className={classes['cart-number']}>{cart.length || 0}</div>
        </div>
        <Tooltip title="Menu">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar src={profile.avatar ? profile.avatar : defaultAvt} sx={{ width: 32, height: 32 }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
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
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {
          profile.role === ROLE.VENDOR && shop.id && (
            <MenuItem onClick={() => handleClickMenu(MenuItemName.MANAGER)} className={classes.menuItem}>
              <MuseumIcon className={classes.icon}/> {MenuItemName.MANAGER}
            </MenuItem>
          )
        }
        {
          profile.role === ROLE.VENDOR
            ? <MenuItem onClick={() => handleClickMenu(MenuItemName.SHOP)} className={classes.menuItem}>
              <StorefrontIcon className={classes.icon}/>  {MenuItemName.SHOP}
            </MenuItem>
            : <MenuItem onClick={() => handleClickMenu(MenuItemName.CREATE)} className={classes.menuItem}>
              <AddBusinessIcon className={classes.icon}/> {MenuItemName.CREATE}
            </MenuItem>
        }
        <MenuItem onClick={() => handleClickMenu(MenuItemName.PROFILE)} className={classes.menuItem}>
          <AccountCircleIcon className={classes.icon}/> {MenuItemName.PROFILE}
        </MenuItem>
        <MenuItem onClick={() => handleClickMenu(MenuItemName.FAVEORITE_LIST)} className={classes.menuItem}>
          <FavoriteIcon className={classes.icon}/> {MenuItemName.FAVEORITE_LIST}
        </MenuItem>
        <MenuItem onClick={() => handleClickMenu(MenuItemName.ORDER)} className={classes.menuItem}>
          <ViewListIcon className={classes.icon}/> {MenuItemName.ORDER}
        </MenuItem>
        <MenuItem onClick={() => handleClickMenu(MenuItemName.NOTIFICATION)} className={classes.menuItem}>
          <CircleNotificationsIcon className={classes.icon}/>
          {MenuItemName.NOTIFICATION}
        </MenuItem>
        <MenuItem onClick={() => handleClickMenu(MenuItemName.LOGOUT)} className={classes.menuItem} >
          <Logout className={classes.icon} />
          {MenuItemName.LOGOUT}
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default AccountMenu;
