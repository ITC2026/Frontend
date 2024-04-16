import api from ".";
import { Project } from "../types";

const projectRoute = "/projects"

export const getAllProjects = async () => {
  try {
    const res = await api.get(projectRoute);
    const projects: Project[] = await res.data.payload;
    return projects;
  } catch (err) {
    console.log(err);
  }
};

export const createProject = async (project: Project) => {
  try {
    const res = await api.post(projectRoute, project);
    const action = await res.data.payload;
    return action;
  } catch (err) {
    console.log(err);
  }
};

export const deleteProject = async (id: number) => {
  try {
    const res = await api.delete(projectRoute, { data: { id } });
    const action = await res.data.payload;
    return action;
  } catch (err) {
    console.log(err);
  }
};

export const getProjectById = async (id: number) => {
  try {
    const res = await api.get(`${projectRoute}/${id}`);
    const project: Project = await res.data.payload;
    return project;
  } catch (err) {
    console.log(err);
  }
};

export const modifyProduct = async (id: number, tproject: Project) => {
  try {
    const res = await api.patch(`${projectRoute}/${id}`, { data: tproject });
    const project: Project = await res.data.payload;
    return project;
  } catch (err) {
    console.log(err);
  }
};
