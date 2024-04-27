import "./Projects.css";
import TableView from "../../../components/table/Table";
import { Project } from "../../../types/.";
import { getAllProjects } from "../../../api/ProjectAPI";
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import ProjectModal from "./ProjectModalExample";
import getClientFromID from "../../../utils/Project/GetClientFromProject";

import { getExpirationDateFromProject } from "../../../utils/Project/GetExpirationDateFromProject";

const project_structure = {
  id: "ID",
  project_title: "Nombre del Proyecto",
  client_name: "Cliente",
  start_date: "Fecha de Apertura",
  expiration: "Fecha de Cierre",
};

interface PropTab {
  selected: string;
  setSelected: (selected: string) => void;
}

const TabNav = (props: PropTab) => {
  const projectTypeList = [
    "Proyectos en Preparación",
    "Proyectos Activos",
    "Proyectos Cerrados",
  ];

  return (
    <ul className="nav nav-pills nav-fill">
      {projectTypeList.map((type: string, index: number) => (
        <li key={index} className="nav-item">
          <a
            key={index}
            className={`nav-link ${props.selected === type ? "encora-purple active text-light" : "text-body"}`}
            onClick={() => props.setSelected(type)}
          >
            {type}
          </a>
        </li>
      ))}
    </ul>
  );
};

const ProjectPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selected, setSelected] = useState<string>("Proyectos en Preparación");
  const [registerProject, setRegisterProject] = useState<boolean>(false);
  const location = useLocation();

  const toggleRegisterProject = () => {
    setRegisterProject((prev) => !prev);
  };

  /**
   * Fetches all projects from the API and sets the projects state,
   * It also fetches the client name for each project and adds it to the project object
   */

  useEffect(() => {
    if (!registerProject) {
      getAllProjects().then(async (data: Project[] | undefined) => {
        if (!data) {
          return;
        }
        const projectsWithClient = await Promise.all(
          data.map(async (project: Project) => {
            const client = await getClientFromID(project.client_id);
            return { ...project, client_name: client };
          })
        );

        const projectWithExpiration = await Promise.all(
          projectsWithClient.map(async (project: Project) => {
            const expiration = await getExpirationDateFromProject(
              String(project.id)
            );
            if (!expiration) return project;
            return { ...project, expiration };
          })
        );

        setProjects(projectWithExpiration);
      });
    }
  }, [registerProject, location]);

  const filteredProjects = projects.filter((project) => {
    if (selected === "Proyectos Activos") {
      return project.general_status === "Active";
    } else if (selected === "Proyectos en Preparación") {
      return project.general_status === "In Preparation";
    } else if (selected === "Proyectos Cerrados") {
      return project.general_status === "Closed";
    }
    return true;
  });


  return (
    <div className="project-page">
      <TabNav selected={selected} setSelected={setSelected} />
      <div className="project-header">
        <div className="project-header-title">
          <h1>Proyectos</h1>
        </div>

        <Outlet />
        {selected === "Proyectos en Preparación" ? (
          <div className="project-register-wrapper"></div>
        ) : (
          ""
        )}
      </div>
      <div className="project-table">
        {projects && (
          <TableView
            hideIndex={true}
            entity={filteredProjects as Project[]}
            categories={project_structure}
            showEdit={selected !== "Proyectos Cerrados"}
          >
            <button
              className="project-register encora-purple-button text-light"
              onClick={toggleRegisterProject}
            >
              {" "}
              Registrar Proyecto{" "}
            </button>
          </TableView>
        )}
      </div>

      {registerProject && (
        <ProjectModal
          isActive={registerProject}
          setActiveModal={toggleRegisterProject}
        />
      )}
    </div>
  );
};

export default ProjectPage;
