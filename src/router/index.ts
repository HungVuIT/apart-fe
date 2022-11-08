import Home from "../pages/Home";
import LoginPage from "../pages/login";
import ProductList from "../pages/ProductList";

const mainRouter = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/search',
    component: ProductList,
  }
];
const authRouter = [
  {
    path: 'auth/login',
    component: LoginPage
  }
];
export { mainRouter, authRouter };
