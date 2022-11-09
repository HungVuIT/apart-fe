import Home from "../pages/Home";
import LoginPage from "../pages/login";
import Product from "../pages/Product";
import ProductList from "../pages/ProductList";

const mainRouter = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/search',
    component: ProductList,
  },
  {
    path: '/product',
    component: Product,
  }
];
const authRouter = [
  {
    path: 'auth/login',
    component: LoginPage
  }
];
export { mainRouter, authRouter };
