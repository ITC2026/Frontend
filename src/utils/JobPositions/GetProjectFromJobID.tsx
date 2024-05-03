import { getPositionById } from "../../api/PositionAPI";
import { getProjectById } from "../../api/ProjectAPI";

export const getProjectTitleFromJobID = async (
  positionId: number
): Promise<string | null> => {
  try {
    const position = await getPositionById(positionId);

    if (!position || !position.project_id) {
      console.log("Position not found or missing project_id");
      return null;
    }

    const project = await getProjectById(position.project_id).catch((error) => {
      console.error(
        `Error fetching project with ID ${position.project_id}:`,
        error
      );
      return null;
    });

    if (project) {
      return project.project_title;
    } else {
      console.log(`No project found for project_id: ${position.project_id}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching project title:", error);
    return null;
  }
};
