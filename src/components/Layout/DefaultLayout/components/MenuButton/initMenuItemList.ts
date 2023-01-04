import { IMenuItem } from '../../../../../interface/globalType';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import ViewListIcon from '@mui/icons-material/ViewList';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import { removeAccessToken, removeRefreshToken } from '../../../../../untils/localStorage';

const a = () => {};
const handleLogout = () => {
  removeAccessToken();
  removeRefreshToken();
  window.location.reload();
};
export const menuItemList: IMenuItem[] = [
  {
    icon: ViewListIcon,
    name: 'Đơn mua',
    func: a
  },
  {
    icon: FavoriteIcon,
    name: 'Sản phẩm yêu thích',
    func: a
  },
  {
    icon: AccountCircleIcon,
    name: 'Hồ sơ',
    func: a
  },
  {
    icon: CircleNotificationsIcon,
    name: 'Thông báo',
    func: a
  },
  {
    icon: LogoutIcon,
    name: 'Đăng xuất',
    func: handleLogout
  }
];
