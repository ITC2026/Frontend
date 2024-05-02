import "./ProjectsPage.css";
import TableStaffer from "../../../components/staffer/TableStaffer";
import getAMUsernameForProject from "../functions/forProjects/getAccountManagerUsernameForProject";
import getClientNameByProjectID from "../functions/forProjects/getClientForProject";

import { getAllProjects } from "../../../api/ProjectAPI";
import { useState, useEffect } from "react";

const projectBlueprint = {
  "project_title": "Nombre del Proyecto",
  "client_name": "Cliente",
  "account_manager": "Account Manager",
  "percentage_complete": "% de Completado",
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
          const accountManager = await getAMUsernameForProject(project.id);
          return { ...project, client_name: client, account_manager: accountManager };
        })
      );

      setProjects(projects);
      console.log(projects);
    });
  }, [setProjects]);

  const filteredProjects = (projects: Project[]) => {
    return projects.filter((project) => (project.general_status === "Active"));
  };


  return (
    <div className="projects-page">
      <div className="project-table-container">
        <h1 className="table-title">Lista de Proyectos</h1>
        <div className="table-wrapper">
          <TableStaffer entity={filteredProjects(projects)} types={projectBlueprint} showInfoButton={false}/>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;