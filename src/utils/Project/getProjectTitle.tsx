import { getProjectById } from "../../api/ProjectAPI";

export const getProjectTitle = async (project_id: number): Promise<string> => {
  const project = await getProjectById(project_id);
  if (!project) {
    return "";
  }

  return project?.project_title;
};
