import "./ProjectsPage.css";
import TableStaffer from "../../../components/staffer/TableStaffer";
import getAMUsernameForProject from "../functions/forProjects/getAccountManagerUsernameForProject";
import getOpeningProgress from "../functions/forProjects/getOpeningProgress";
import getClientNameByProjectID from "../functions/forProjects/getClientForProject";
import { getExpirationDateFromProject } from "../../../utils/Project/GetExpirationDateFromProject";
import { Link } from "react-router-dom"
import { getAllProjects } from "../../../api/ProjectAPI";
import { useState, useEffect } from "react";

const projectBlueprint = {
  "project_title": "Nombre del Proyecto",
  "client_name": "Cliente",
  "account_manager": "Account Manager",
  "opening_progress": "% de Completado",
  "start_date": "Fecha de Apertura",
  "expiration_date": "Fecha de Cierre",
}

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getAllProjects().then(async (data: unknown) => {
      if (!data) {
        return;
      }
      const projects = await Promise.all(
        (data as Project[]).map(async (project: Project) => {
          const client = await getClientNameByProjectID(project.id);
          const accountManager = "Sin Usuario Asignado";
          const expiration : Date  | null = await getExpirationDateFromProject(
            String(project.id));
          return { ...project , client_name: client, account_manager: accountManager , expiration , opening_progress : await getOpeningProgress(project.id)};
        })
      );

      setProjects(projects);
      console.log(projects);
    });
  }, [setProjects]);

  const filteredProjects = (projects: Project[]) => {
    return projects.filter((project) => (project.general_status === "Active"));
  };

  const openingsButton = () => {
    return (
      <Link to={"positions"}>
        <i className="bi bi-person-plus-fill"></i>
      </Link>
    );
  };

  return (
    <div className="projects-page">
      <div className="project-table-container">
        <h1 className="table-title">Lista de Proyectos</h1>
        <div className="table-wrapper">
          <TableStaffer entity={filteredProjects(projects)} types={projectBlueprint} buttonArr={[openingsButton()]} />
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;