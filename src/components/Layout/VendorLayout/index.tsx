import { IPropsChildren } from '../../../interface/globalType';
import classes from './vendor.module.scss';
import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { menuVendor } from './definitionMenu';
import { useLocation, useNavigate } from 'react-router-dom';
import { IMenuVendorItem } from './type';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getListProductOfShop, getProfileShop } from '../../../redux/vendor/vendorThunk';
import './customMui.scss';
import { useEffect, useState } from 'react';
import { getAccessToken } from '../../../untils/localStorage';
import { getProfile } from '../../../redux/user/userThunk';
import Loading from '../../Loading';
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    })
  })
);

export default function VendorLayout({ children }: IPropsChildren) {
  const [open, setOpen] = React.useState(false);
  const [menuRender, setMenuRender] = React.useState([...menuVendor]);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { shop } = useAppSelector(state => state.vendor);
  const { profile } = useAppSelector(state => state.user);
  const [loading, setLoading] = useState(!(profile.username));
  useEffect(() => {
    getInfor();
  }, []);
  React.useEffect(() => {
    const newMenu = menuVendor.map(item => item.link === location.pathname ? ({ ...item, active: true }) : item);
    setMenuRender(newMenu);
  }, []);
  React.useEffect(() => {
    if (shop.id) {
      dispatch(getListProductOfShop(shop.id));
    }
  }, [shop]);
  const getInfor = async () => {
    setLoading(true);
    if (!shop.email) {
      if (!profile.username) {
        await dispatch(getProfile());
      }
      await dispatch(getProfileShop());
    }
    setLoading(false);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClickBtn = (_item: IMenuVendorItem) => {
    const newMenu = menuVendor.map(item => item.id === _item.id ? ({ ...item, active: true }) : item);
    setMenuRender(newMenu);
    navigate(_item.link);
  };
  return (
    <>
      {loading && <Loading />}
      <Box sx={{
        display: (loading ? 'none' : 'flex')
      }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          sx={{
            backgroundColor: '#212529',
            color: '#f8f9fa'
          }}
        >
          {open && <h1 className={classes.shopName} style={{ cursor: 'pointer' }} onClick={() => navigate('/')}><i>{shop.name}</i></h1>}
          {open
            ? <>
            <IconButton
              onClick={handleDrawerClose}>
                <ChevronLeftIcon
                  sx={{
                    fontSize: '25px',
                    color: '#f8f9fa'
                  }}
                  />
              </IconButton>
            </>
            : <IconButton
              onClick={handleDrawerOpen}
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{
                marginRight: '5px'
              }}
              >
                <MenuIcon
                  sx={{
                    fontSize: '25px'
                  }}
                />
              </IconButton>
            }
        </DrawerHeader>
        <Divider />
        <List>
          {menuRender.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={() => handleClickBtn(item)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  backgroundColor: item.active ? '#343541' : '#202123',
                  px: 2.5
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center'
                  }}
                >
                  <item.icon
                    sx={{
                      fontSize: '25px',
                      color: '#f8f9fa'
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary={item.name}
                  sx={{
                    opacity: open ? 1 : 0
                  }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
    </>
  );
}
