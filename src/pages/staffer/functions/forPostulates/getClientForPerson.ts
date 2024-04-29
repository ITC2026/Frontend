import { getClientById } from "../../../../api/ClientAPI";
import { getEmployeeById } from "../../../../api/EmployeeAPI";
import { getProjectOfPersonByID } from "../../../../api/PersonAPI";

const getClientFromID = async (id: number) => {
    try {
        const employee = await getEmployeeById(id); 
        if (!employee) {
            return "";
        }
        const project = await getProjectOfPersonByID(employee.person_id);
        if (!project) {
            return "";
        }
        console.log(project);
        const client = await getClientById(project.client_id);
        if (!client) {
            return "";
        }
        return client.client_name;


    } catch (error) {
      console.error("Error fetching client from ID:", error);
      return "";
    }
};

export default getClientFromID;