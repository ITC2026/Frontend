import "./Projects.css";
import TableView from "../../../components/table/Table";
import { getAllProjects } from "../../../api/ProjectAPI";
import { useState, useEffect } from "react";

const projectBlueprint = {
  "project_title": "Nombre del Proyecto",
  "client_name": "Cliente",
  "account_manager": "Account Manager",
  "percentage_complete": "% de Cobertura",
  "start_date": "Fecha de Apertura",
  "expiration_date": "Fecha de Cierre",
}


const ProjectPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getAllProjects().then((data: unknown) => {
      setProjects(data as Project[]);
      console.log(data);
    });
  }, [setProjects]);

  return (
    <div>
      <h1>Proyectos</h1>

      <TableView entity = {projects} types = {projectBlueprint} type="Project"/>
    </div>
  );
};

export default ProjectPage;
