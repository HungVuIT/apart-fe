import FavoriteList from '../pages/User/FavoriteList';
import Home from '../pages/common/Home';
import Product from '../pages/common/Product';
import ProductList from '../pages/common/ProductList';
import UserInfor from '../pages/User/UserInfor';
import UserOrder from '../pages/User/UserOrder';
import Cart from '../pages/common/Cart';
import RegisterShop from '../pages/Vendor/RegisterShop';
import { VendorLayout } from '../components/Layout';
import ProductManager from '../pages/Vendor/ProductManager';
import NewWatch from '../pages/Vendor/NewWatch';
import OrderManager from '../pages/Vendor/OrderManager';
import ProfileStore from '../pages/Vendor/ProfileStore';
import Payment from '../pages/User/Payment';
import LoadingPage from '../components/LoadingPage';
import StorePage from '../pages/Vendor/StorePage';
import NewsPage from '../pages/common/News';
import NewsItem from '../pages/common/NewsItem';
import EditWatch from '../pages/Vendor/EditWatch';

const mainRouter = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/search',
    component: ProductList
  },
  {
    path: '/product/:productId',
    component: Product
  },
  {
    path: '/shop/:shopId',
    component: StorePage
  },
  {
    path: '/news',
    component: NewsPage
  },
  {
    path: '/news/:newsId',
    component: NewsItem
  }
];
const userRouter = [
  {
    path: '/user/order',
    Layout: true,
    component: UserOrder
  },
  {
    path: '/user/profile',
    Layout: true,
    component: UserInfor
  },
  {
    path: '/user/favorite-list',
    Layout: true,
    component: FavoriteList
  },
  {
    path: '/user/cart',
    Layout: true,
    component: Cart
  },
  {
    path: '/payment',
    Layout: false,
    component: Payment
  }
];
const vendorRouter = [
  {
    path: '/shop/register',
    component: RegisterShop
  },
  {
    path: '/shop/manager/watch',
    component: ProductManager,
    Layout: true
  },
  {
    path: '/shop/manager/order',
    component: OrderManager,
    Layout: true
  },
  {
    path: '/shop/watch/new',
    component: NewWatch,
    Layout: false
  },
  {
    path: '/shop/watch/edit/:watchId',
    component: EditWatch,
    Layout: false
  },
  {
    path: '/shop/manager/profile',
    component: ProfileStore,
    Layout: true
  }
];
const authRouter = [
  {
    path: '/oauth2',
    component: LoadingPage,
    Layout: true
  }
];
export { mainRouter, vendorRouter, userRouter, authRouter };
