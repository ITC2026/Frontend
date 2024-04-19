import "./Projects.css";
import TableView from "../../../components/table/Table";
import { Project } from "../../../types/.";
import { getAllProjects } from "../../../api/ProjectAPI";
import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";

const project_structure = {
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
  const navigate = useNavigate();

  useEffect(() => {
    getAllProjects().then((data: unknown) => {
      setProjects(data as Project[]);
    });
  }, [setProjects]);

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
    <div>
      <TabNav selected={selected} setSelected={setSelected} />
      <div className="project-header">
        <h1>Proyectos</h1>
        <Outlet />
        {selected === "Proyectos en Preparación" ? (
          <button
            className="project-register encora-purple-button text-light"
            onClick={() => navigate("/account_manager/projects/register")}
          >
            {" "}
            Registrar Proyecto{" "}
          </button>
        ) : (
          ""
        )}
      </div>

      {projects && (
        <TableView
          entity={filteredProjects}
          elements={project_structure}
          type="Project"
        />
      )}
    </div>
  );
};

export default ProjectPage;
