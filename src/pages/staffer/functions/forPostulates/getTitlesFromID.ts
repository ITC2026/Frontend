import { getAllApplications } from "../../../../api/ApplicationAPI";
import { getPositionById } from "../../../../api/PositionAPI";
import { getProjectById } from "../../../../api/ProjectAPI";

const getTitlesFromID = async (id: number) => {
    try {
      const apps = await getAllApplications() as Application[];
      const notActiveApplication = apps.find((app) =>  app.person_id === id && app.application_status !== "Accepted") 
      const position = await getPositionById(notActiveApplication?.position_id as number);
      const project = await getProjectById(position?.project_id as number);

      return ([project?.project_title as string, position?.position_title as string])
    } catch (error) {
      console.error("Error fetching project from ID:", error);
      return "";
    }
};

export default getTitlesFromID;