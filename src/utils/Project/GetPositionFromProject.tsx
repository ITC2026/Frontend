import { getProjectById } from "../../api/ProjectAPI";

export const getPositionsByProject = async (id: number) => {
  const project = await getProjectById(id);
  if (!project) return [];
  return project.positions;
};
