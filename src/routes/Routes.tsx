import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/error/ErrorPage";
import App from "../App";
import LoginPage from "../pages/login/LoginPage";
import Settings from "../components/Configuration";
import AccountManagerWrapper from "../pages/accountManager/AccountManager";

interface Props {
  route: string;
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/configuration",
    element: <Settings />,
  },
  {
    path: "/",
    element: <App />,
    children: [],
    errorElement: <ErrorPage />,
  },
  {
    path: "/account_manager",
    element: <AccountManagerWrapper route={"/account_manager"} />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
