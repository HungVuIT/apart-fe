import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import './MenuButton.scss';
import { menuItemList } from './initMenuItemList';
import { removeAccessToken, removeRefreshToken } from '../../../../../untils/localStorage';
import { MenuItemName } from '../../../../../interface/enum';
import { useNavigate } from 'react-router-dom';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function MenuButton() {
  const anchor = 'left';
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAccessToken();
    removeRefreshToken();
    window.location.reload();
  };

  const handleClick = (_name: MenuItemName) => {
    switch (_name) {
      case MenuItemName.LOGOUT:
        handleLogout();
        break;
      case MenuItemName.PROFILE:
        navigate('/user/profile');
        break;
      case MenuItemName.FAVEORITE_LIST:
        navigate('/user/favorite-list');
        break;
      case MenuItemName.ORDER:
        navigate('/user/order');
        break;
    }
  };

  const toggleDrawer =
    (open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
        setIsOpen(open);
      };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      className="menu-box"
    >
      <div className="logo">D&H</div>
      <Divider />
      <List>
        {menuItemList.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton onClick={() => handleClick(item.name)}>
              <ListItemIcon>
                <item.icon className='menu-icon'/>
              </ListItemIcon>
              <ListItemText primary={item.name} className='menu-text'/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <div className="bku"><i>BKU@2022 D&H Team</i></div>
    </Box>
  );

  return (
    <div className='Menu-btn__wrapper'>
        <React.Fragment>
          <Button onClick={toggleDrawer(true)} className="menu-btn">
            <MenuIcon className='menu-icon'/>
          </Button>
          <Drawer
            anchor={anchor}
            open={isOpen}
            onClose={toggleDrawer(false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
    </div>
  );
}
