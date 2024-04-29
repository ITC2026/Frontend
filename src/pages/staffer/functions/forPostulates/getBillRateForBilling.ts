import { getEmployeeById } from "../../../../api/EmployeeAPI";
import { getPositionOfPersonByID } from "../../../../api/PersonAPI";

const getClientFromID = async (id: number) => {
    try {
        const employee = await getEmployeeById(id); 
        if (!employee) {
            return "";
        }
        const position = await getPositionOfPersonByID(employee.person_id);
        if (!position) {
            return "";
        }
        const billRate = position.bill_rate.toString();
        console.log(billRate);
        return billRate;

    } catch (error) {
      console.error("Error fetching Bill Rate from ID:", error);
      return "";
    }
};

export default getClientFromID;