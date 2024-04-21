import "./ProjectsPage.css";
import TableView from "../../../components/table/Table";
// import OptionsIcons from "../../../components/options/OptionsIcons";
import { Project } from "../../../types/.";
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
  
// const iconList = [{
//   IconName: 'bi bi-person-plus-fill'
// }];

const ProjectsPage: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
      
    useEffect(() => {
      getAllProjects().then((data: unknown) => {
        setProjects(data as Project[]);
        console.log(data);
      });
    }, [setProjects]);
        
    return (
        <div className="projects-page">
          <div className="project-table-container">
            <h1 className="table-title">Lista de Proyectos</h1>
            <div className="table-wrapper">
              <TableView entity = {projects} types={projectBlueprint}/>
            </div>
          </div>
        </div>
    );
};

export default ProjectsPage;