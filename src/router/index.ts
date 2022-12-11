import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import LoginPage from '../pages/login';
import Product from '../pages/Product';
import ProductList from '../pages/ProductList';
import UserInfor from '../pages/UserInfor';
import UserOrder from '../pages/UserOrder';

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
    path: 'user/information',
    component: UserInfor
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
