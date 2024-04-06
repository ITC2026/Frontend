import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import App from "../App";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App/>,
      children: [

      ],
      errorElement: <ErrorPage/>,
    },
  ],
);

export default router; 