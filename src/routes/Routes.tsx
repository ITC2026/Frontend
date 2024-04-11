import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/error/ErrorPage";
import LoginPage from "../pages/login/LoginPage";
import SettingsPage from "../pages/settings/SettingsPage";

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
]);

export default router;
