import Dashboard from '../pages/Dashboard';
import FavoriteList from '../pages/User/FavoriteList';
import Home from '../pages/common/Home';
import LoginPage from '../pages/login';
import Product from '../pages/common/Product';
import ProductList from '../pages/common/ProductList';
import UserInfor from '../pages/User/UserInfor';
import UserOrder from '../pages/User/UserOrder';

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
    path: '/product',
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
export { mainRouter, authRouter, adminRouter };
