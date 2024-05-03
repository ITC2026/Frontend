import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/error/ErrorPage";
import App from "../App";
import LoginPage from "../pages/login/LoginPage";
import SettingsPage from "../pages/settings/SettingsPage";
import AccountManagerWrapper from "../pages/accountManager/AccountManagerWrapper";
import ModalPage from "../pages/ModalPage/ModalPage";
import ProjectInfoWrapper from "../pages/accountManager/projects/ProjectInfoWrapper";
import ProjectModifyWrapper from "../pages/accountManager/projects/modify/ProjectModifyWrapper";
import JobPositionPage from "../pages/accountManager/JobPositions/JobPosition";
import JobPositionModify from "../pages/accountManager/JobPositions/JobPositionModify";
import OpeningTablePage from "../pages/accountManager/JobPositions/Openings/OpeningTablePage";
import OpeningWrapper from "../components/accountManager/opening/OpeningWrapper";
import OpeningStatusModal from "../components/staffer/ProjectPositions/StatusModal";

import FirebaseStorage from "../pages/firebaseStorage/FirebaseStorage";
import ClientPage from "../pages/accountManager/clients/ClientPage";
import ProjectPage from "../pages/accountManager/projects/Projects";
import ClientWrapper from "../pages/accountManager/clients/ClientWrapper";

import ChartStaffer from "../pages/dashboards/DashboardStaffer";
import ChartAccount from "../pages/dashboards/DashboardAccount";
import ChartResource from "../pages/dashboards/DashboardResource";

import StafferWrapper from "../pages/staffer/StafferWrapper";
import ProjectsPage from "../pages/staffer/projects/ProjectsPage";
import PostulatesPage from "../pages/staffer/postulates/PostulatesPage";
import PositionsPage from "../pages/staffer/positions/PositionsPage";
import CandidatesPage from "../pages/staffer/candidates/CandidatesPage";

//Resource
import ResourceWrapper from "../pages/resourceManager/ResourceManagerWrapper";
import People from "../pages/resourceManager/People/People";
import PersonModifyWrapper from "../pages/resourceManager/employees/modifyForms/PersonModifyWrapper";
import PersonInfoWrapper from "../pages/resourceManager/employees/infoForms/PersonInfoWrapper";

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
        children: [
          {
            path: ":id/",
            element: <ClientWrapper modalType="modify" />,
          },
          {
            path: "info/:id/",
            element: <ClientWrapper modalType="read" />,
          },
        ],
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
        ],
      },
      {
        path: "projects/edit/:id/",
        element: <ProjectModifyWrapper />,
        children: [
          {
            path: ":id/",
            element: <JobPositionModify origin="Project" type="Info" />,
          },
          {
            path: "edit/:id/",
            element: <JobPositionModify origin="Project" type="Modify" />,
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
            <JobPositionPage />
          </>
        ),
        children: [
          {
            path: "edit/:id/",
            element: <JobPositionModify type="Modify" />,
          },
        ],
      },
      {
        path: "positions/:id/",
        element: <OpeningTablePage />,
        children: [
          {
            path: "edit/:id/",
            element: <OpeningWrapper type="Modify" />,
          },
          {
            path: ":id/",
            element: <OpeningWrapper type="Info" />,
          },
        ],
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "staffer",
    element: (
      <>
        <StafferWrapper
          route="/staffer"
          routes={["/", "/projects", "/postulates", "/postulates/"]}
        />
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
      },
      {
        path: "projects/positions/:id",
        element: <PositionsPage />,
        children: [
          {
            path: "edit/:id",
            element: <OpeningStatusModal />,
          },
        ],
      },
      {
        path: "projects/positions/:id1/:id2/candidates",
        element: <CandidatesPage />,
      },
      {
        path: "postulates",
        element: <PostulatesPage />,
        children: [
          {
            path: ":id",
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
            path: ":id/",
            element: <PersonInfoWrapper />,
          },
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
  {
    path: "/firebaseStorage",
    element: <FirebaseStorage />,
  },
  {
    path: "resource",
    element: (
      <>
        <ChartResource />
      </>
    ),
  },
]);

export default router;
