import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/error/ErrorPage";
import App from "../App";
import LoginPage from "../pages/login/LoginPage";
import SettingsPage from "../pages/settings/SettingsPage";
import AccountManagerWrapper from "../pages/accountManager/AccountManagerWrapper";
import ProjectPage from "../pages/accountManager/projects/Projects";
import ModalPage from "../pages/ModalPage/ModalPage";
import ProjectInfoWrapper from "../pages/accountManager/projects/ProjectInfoWrapper";
import ProjectModifyWrapper from "../pages/accountManager/projects/modify/ProjectModifyWrapper";
import FirebaseStorage from "../pages/firebaseStorage/FirebaseStorage";
import ClientPage from "../pages/accountManager/Clientes/ClientPage";

import ChartStaffer from "../pages/dashboards/DashboardStaffer";
import ChartAccount from "../pages/dashboards/DashboardAccount";
import ChartResource from "../pages/dashboards/DashboardResource";

import StafferWrapper from "../pages/staffer/StafferWrapper";
import ProjectsPage from "../pages/staffer/projects/ProjectsPage";
import PostulatesPage from "../pages/staffer/postulates/PostulatesPage";

//Resource
import ResourceWrapper from "../pages/resourceManager/ResourceManagerWrapper";
import People from "../pages/resourceManager/People/People";
import PersonModifyWrapper from "../pages/resourceManager/employees/modifyForms/PersonModifyWrapper";


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
            <ChartAccount />,
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
        children: [
          {
            path: ":id/",
            element: <ProjectInfoWrapper />,
          },
          {
            path: "edit",
            children: [
              {
                path: ":id/",
                element: <ProjectModifyWrapper />,
              },
            ],
          },
        ],
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
        <StafferWrapper route="/staffer" routes={["/", "/projects", "/people", "/people/"]} />
      </>
    ),
    children: [
      {
        path: "",
        element: (
          <>
            <ChartStaffer />,
          </>
        ),
      },

      {
        path: "projects",
        element: <ProjectsPage />,
        children: [
          {
            path: "positions",
            //Pending
          },
        ],
      },
      
      {
        path: "people",
        element: <PostulatesPage />,
      },
      {
      path: "people/:id",
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
    path: "resource",
    element: (
      <>
        <ResourceWrapper route="/resource" />
      </>
    ),
    children: [
      {
        path: "",
        element: (
          <>
          <ChartResource />,
          </>
        ),
      },
      {
        path: "people",
        element: (
          <>
            <People />
          </>
        ),
        children: [
          {
            path: "edit",
            children: [
              {
                path: ":id/",
                element: <PersonModifyWrapper />,
              },
            ],
          },
        ],
      },
      {
        path: "settings",
        element: (
          <>
            <SettingsPage />
          </>
        ),
      }
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
  {
    path: "/firebaseStorage",
    element: <FirebaseStorage />,
  },
]);

export default router;
