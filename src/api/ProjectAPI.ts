/* eslint-disable @typescript-eslint/no-explicit-any */
import api from ".";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const projectRoute = "/projects";

export const getAllProjects = async () => {
  try {
    const res = await api.get(projectRoute);
    const projects: Project[] = await res.data.payload;
    return projects;
  } catch (err) {
    console.log(err);
  }
};

export const createProject = async (project: CreateProjectAttributes) => {
  try {
    const res = await api.post(projectRoute, project);
    const action = await res.data.payload;
    toast.success("Proyecto creado exitosamente");
    return action;
  } catch (err) {
    if ((err as any).response && (err as any).response.status === 500) {
      toast.error("Error interno del servidor");
      return "Internal Server Error";
    }
    console.log(err);
  }
};

export const deleteProject = async (id: number) => {
  try {
    const res = await api.delete(projectRoute, { data: { id } });
    toast.success("Proyecto eliminado exitosamente");
    const action = await res.data.payload;
    return action;
  } catch (err) {
    toast.error("Error al eliminar el proyecto");
    console.log(err);
  }
};

export const getProjectById = async (id: number) => {
  try {
    const res = await api.get(`${projectRoute}/${id}`);
    const project: Project = await res.data.payload;
    return project;
  } catch (err) {
    console.log("Error fetching project by id. :)");
  }
};

export const modifyProject = async (
  id: number,
  tproject: CreateProjectAttributes
) => {
  try {
    console.log(tproject);

    const res = await api.patch(`${projectRoute}/${id}`, tproject);
    const project: CreateProjectAttributes = await res.data.payload;
    return project;
  } catch (err) {
    console.log(err);
  }
};
