import Home from "../pages/Home";
import LoginPage from "../pages/login";

const publishRoutes = [
    {
      path: '/',
      component: Home,
  }
];
const privateRoutes = [
  {
    path: 'auth/login',
    component: LoginPage
  }
];
export { publishRoutes, privateRoutes };
