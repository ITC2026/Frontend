import "./Projects.css";
import TableView from "../../../components/table/Table";
import { Project } from "../../../types/.";
import { getAllProjects } from "../../../api/ProjectAPI";
import { useState, useEffect } from "react";

const project_structure = {
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

      <TableView entity = {projects} types = {project_structure}/>
    </div>
  );
};

export default ProjectPage;
