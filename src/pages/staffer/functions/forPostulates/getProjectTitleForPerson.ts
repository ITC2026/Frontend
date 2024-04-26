import { getProjectOfPersonByID } from "../../../../api/PersonAPI";

const getProjectTitleFromID = async (id: number) => {
    try {
      const project = await getProjectOfPersonByID(id);
      if (!project) return "No Project Found";
      const projectTitle = project.project_title.toString();
      return projectTitle;
    } catch (error) {
      console.error("Error fetching project from ID:", error);
      return "";
    }
};

export default getProjectTitleFromID;