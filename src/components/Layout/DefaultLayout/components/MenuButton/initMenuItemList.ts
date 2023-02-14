import { useNavigate } from 'react-router-dom';
import { IMenuItem } from '../../../../../interface/globalType';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import ViewListIcon from '@mui/icons-material/ViewList';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import { removeAccessToken, removeRefreshToken } from '../../../../../untils/localStorage';
import { MenuItemName } from '../../../../../interface/enum';

const a = () => {};

export const menuItemList: IMenuItem[] = [
  {
    icon: ViewListIcon,
    name: MenuItemName.ORDER
  },
  {
    icon: FavoriteIcon,
    name: MenuItemName.FAVEORITE_LIST
  },
  {
    icon: AccountCircleIcon,
    name: MenuItemName.PROFILE
  },
  {
    icon: CircleNotificationsIcon,
    name: MenuItemName.NOTIFICATION
  },
  {
    icon: LogoutIcon,
    name: MenuItemName.LOGOUT
  }
];
