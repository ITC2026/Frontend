import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/error/ErrorPage";
import App from "../App";
import LoginPage from "../pages/login/LoginPage";
import SettingsPage from "../pages/settings/SettingsPage";
import AccountManagerWrapper from "../pages/accountManager/AccountManagerWrapper";
import StafferWrapper from "../pages/staffer/stafferWrapper";


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
  },
  {
    path: "account_manager",
    element: (
      <>
        <AccountManagerWrapper route="/account_manager" routes = {["/", "/clients", "/projects", "/positions"]}/>
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
            <h1>clients</h1>
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
    path: "staffer",
    element: (
      <>
        <StafferWrapper route = "/staffer" routes = {["/", "/projects", "/people"]}/>
      </>
    ),
    children: [
      {
        path: "",
        element: (
          <>
            <h1>Dashboards</h1>
          </>
        ),
      },
      {
        path: "projects",
        element: (
          <>
            <h1>Projects</h1>
          </>
        ),
      },
      {
        path: "people",
        element: (
          <>
            <h1>People</h1>
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
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
export default router;
