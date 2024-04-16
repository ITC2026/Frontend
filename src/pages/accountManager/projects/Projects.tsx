import "./Projects.css";
import TableView from "../../../components/table/Table";
import { Project } from "../../../types/.";
import { getAllProjects } from "../../../api/ProjectAPI";
import { useState, useEffect } from "react";

const projectCategories = ["Title", "Description", "Client ID"];

const ProjectPage = () => {
  const [project, setProject] = useState<Project[]>([]);

  useEffect(() => {
    getAllProjects().then((data: unknown) => {
      setProject(data as Project[]);
      console.log(data);
    });
  }, [setProject]);

  return (
    <div>
      <h1>Proyectos</h1>

      <TableView categories={projectCategories} content={project} />
    </div>
  );
};

export default ProjectPage;
