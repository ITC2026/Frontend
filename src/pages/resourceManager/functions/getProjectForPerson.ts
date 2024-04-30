import { getAllPositions } from "../../../api/PositionAPI";
import { getAllProjects } from "../../../api/ProjectAPI";

import getAllFilledOpenings from "./getAllFilledOpenings";

const getProjectForPerson = async (id: number) => {
    try {

        console.log("ESTE ES EL ID DE TU PERSONA: ", id);

        const openings = await getAllFilledOpenings();
        if (!openings) {
            return "";
        }
        
        const jobPositions = await getAllPositions();
        if (!jobPositions) {
            return "";
        }

        const projects = await getAllProjects();
        if (!projects) {
            return "";
        }

        const employeeOpening = openings.find((opening) => opening.person_id === id);
        if (!employeeOpening) {
            return "";
        }

        const openingJobPosition = jobPositions.find((jobPosition) => jobPosition.id === employeeOpening.position_id);
        if (!openingJobPosition) {
            return "";
        }



        const jobPositionProject = projects.find((project) => project.id === openingJobPosition.project_id);
        if (!jobPositionProject) {
            return "";
        }

        return jobPositionProject.project_title;
    
    } catch (error) {
      console.error("Error fetching client from ID:", error);
      return "";
    }
};

export default getProjectForPerson;