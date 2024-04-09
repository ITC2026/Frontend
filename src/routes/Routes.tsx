import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import App from "../App";
import LoginPage from "../pages/login/LoginPage";
import Chart from "../pages/dashboards/Chart";


const router = createBrowserRouter(
  [
    {
      path: "/login",
      element: <LoginPage />, 
    },
    {
      path: "/",
      element: <App/>,
      children: [

      ],
      errorElement: <ErrorPage/>,
    },
    {
      path: "/Chart",
      element: <Chart />,
    }
  ],
);

export default router; 