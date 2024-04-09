import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import App from "../App";
import LoginPage from "../pages/login/LoginPage";
import Settings from "../components/Configuration";

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
]);

export default router;
