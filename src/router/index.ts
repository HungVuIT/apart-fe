import Dashboard from '../pages/admin/Dashboard';
import FavoriteList from '../pages/User/FavoriteList';
import Home from '../pages/common/Home';
import LoginPage from '../pages/login';
import Product from '../pages/common/Product';
import ProductList from '../pages/common/ProductList';
import UserInfor from '../pages/User/UserInfor';
import UserOrder from '../pages/User/UserOrder';
import Cart from '../pages/common/Cart';
import RegisterShop from '../pages/Vendor/RegisterShop';

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
    path: '/user/order',
    component: UserOrder
  },
  {
    path: '/user/profile',
    component: UserInfor
  },
  {
    path: '/user/favorite-list',
    component: FavoriteList
  },
  {
    path: '/user/cart',
    component: Cart
  }
];
const authRouter = [
  {
    path: 'auth/login',
    component: LoginPage
  }
];
const adminRouter = [
  {
    path: 'admin/dashboard',
    component: Dashboard
  }
];
const vendorRouter = [
  {
    path: '/shop/register',
    component: RegisterShop
  }
];
export { mainRouter, authRouter, adminRouter, vendorRouter };
