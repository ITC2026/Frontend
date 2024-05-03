import { getPositionById } from "../../api/PositionAPI";
import { getProjectById } from "../../api/ProjectAPI";

export const getProjectTitleFromJobID = async (
  positionId: number
): Promise<string | null> => {
  try {
    const position = await getPositionById(positionId);

    if (position) {
      const project = await getProjectById(position.project_id);
      if (project) {
        return project.project_title;
      }
      return null;
    }
    return null;
  } catch (error) {
    console.log("Error fetching project title");
  }
  return null;
};
