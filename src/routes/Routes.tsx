import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/error/ErrorPage";
import App from "../App";
import LoginPage from "../pages/login/LoginPage";
import SettingsPage from "../pages/settings/SettingsPage";
import AccountManagerWrapper from "../pages/accountManager/AccountManagerWrapper";
import ModalPage from "../pages/ModalPage/ModalPage";
import ClientPage from "../pages/accountManager/Clientes/ClientPage";
import ProjectPage from "../pages/accountManager/projects/Projects";
//Staffer
import StafferWrapper from "../pages/staffer/StafferWrapper";
import ProjectsPage from "../pages/staffer/projects/ProjectsPage";
import PostulatesPage from "../pages/staffer/postulates/PostulatesPage";

const router = createBrowserRouter([
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "settings",
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
        <AccountManagerWrapper route="/account_manager" />
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
            <ClientPage />
          </>
        ),
      },
      {
        path: "projects",
        element: (
          <>
            <ProjectPage />
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
        <StafferWrapper route="/staffer" routes={["/", "/projects", "/people"]} />
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
        element: <ProjectsPage />,
      },
      {
        path: "people",
        element: <PostulatesPage />, 
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
  {
    path: "/modalPage",
    element: <ModalPage />,
  },
]);
export default router;
