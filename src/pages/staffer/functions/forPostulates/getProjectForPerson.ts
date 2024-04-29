import { getEmployeeById } from "../../../../api/EmployeeAPI";
import { getProjectOfPersonByID } from "../../../../api/PersonAPI";

const getProjectFromID = async (id: number) => {
    try {
        const employee = await getEmployeeById(id); 
        if (!employee) {
            return "";
        }
        const project = await getProjectOfPersonByID(employee.person_id);
        if (!project) {
            return "";
        }
        return project.project_title;


    } catch (error) {
      console.error("Error fetching client from ID:", error);
      return "";
    }
};

export default getProjectFromID;