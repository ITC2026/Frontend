import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/error/ErrorPage";
import App from "../App";
import LoginPage from "../pages/login/LoginPage";
import SettingsPage from "../pages/settings/SettingsPage";
import AccountManagerWrapper from "../pages/accountManager/AccountManagerWrapper";
import TestAndres from "../pages/testing-andres/TestAndres";
import Clients from "../pages/accountManager/clients/Clients";

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
    path:"/testAndres",
    element: <TestAndres/>
  },
  {
    path: "",
    element: <App />,
  },
  {
    path: "account_manager",
    element: (
      <>
        <AccountManagerWrapper route="/account_manager"/>
      </>
    ),
    children: [
      {
        path: "",
        element: (
          <>
            <h1>home</h1>
          </>
        ),
      },
      {
        path: "clients",
        element: (
          <>
            <Clients/>
          </>
        ),
      },
      {
        path: "projects",
        element: (
          <>
            <h1>projects</h1>
          </>
        ),
      },
      {
        path: "settings",
        element: (
          <>
            <SettingsPage />
          </>
        ),
      },
      {
        path: "positions",
        element: (
          <>
            <h1>positions</h1>
          </>
        ),
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
export default router;
