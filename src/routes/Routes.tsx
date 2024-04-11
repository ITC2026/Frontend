import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/error/ErrorPage";
import App from "../App";
import LoginPage from "../pages/login/LoginPage";
<<<<<<< HEAD
import Settings from "../components/Configuration";
import AccountManagerWrapper from "../pages/accountManager/AccountManager";

interface Props {
  route: string;
}
=======
import SettingsPage from "../pages/settings/SettingsPage";
>>>>>>> 1fc3c2fc637493d5a8c563d6fd27b2c9b40b2c69

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage/>,
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
