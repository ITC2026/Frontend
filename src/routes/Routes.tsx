import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/error/ErrorPage";
import App from "../App";
import LoginPage from "../pages/login/LoginPage";
import SettingsPage from "../pages/settings/SettingsPage";
import AccountManagerWrapper from "../pages/accountManager/AccountManager";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
  {
    path: "",
    element: <App />,
    children: [],
  },
  {
    path: "/account_manager",
    element: (
      <>
        <AccountManagerWrapper route="/account_manager" content={":)"} />
      </>
    ),
    children: [
      {
        path: "/account_manager/clients",
        element: (
          <>
            <h1>clients</h1>
          </>
        ),
      },
      {
        path: "/account_manager/projects",
        element: (
          <>
            <h1>projects</h1>
          </>
        ),
      },
      {
        path: "/account_manager/settings",
        element: (
          <>
            <h1>settings</h1>
          </>
        ),
      }
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
export default router;
