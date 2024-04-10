import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/error/ErrorPage";
import App from "../App";
import LoginPage from "../pages/login/LoginPage";
import AccountManagerWrapper from "../pages/accountManager/AccountManager";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <App />,
    children: [],
    errorElement: <ErrorPage />,
  },
  {
    path: "/account_manager",
    element: <AccountManagerWrapper />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
