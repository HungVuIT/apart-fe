import { IMenuVendorItem } from './type';
import BallotIcon from '@mui/icons-material/Ballot';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import StoreIcon from '@mui/icons-material/Store';
import DashboardIcon from '@mui/icons-material/Dashboard';
export const menuVendor: IMenuVendorItem[] = [
  {
    id: 0,
    name: 'Thống kê',
    link: '/shop/dashboard',
    icon: DashboardIcon,
    active: false
  },
  {
    id: 1,
    name: 'Quản lý sản phẩm',
    link: '/shop/manager/watch',
    icon: BallotIcon,
    active: false
  },
  {
    id: 2,
    name: 'Quản lý đơn hàng',
    link: '/shop/manager/order',
    icon: ReceiptLongIcon,
    active: false
  },
  {
    id: 3,
    name: 'Hồ sơ cửa hàng',
    link: '/shop/manager/profile',
    icon: StoreIcon,
    active: false
  }
];
