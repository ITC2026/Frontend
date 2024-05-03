import { getAllEmployees } from "../../../api/EmployeeAPI";

const getEmployeesActionByPersonID = async (id: number) => {
    try {
        const employees = await getAllEmployees();
        if (!employees) {
            return [];
        }
        const employee = employees.find((employee) => employee.person_id === id);
        if (!employee) {
            return [];
        }
        return employee.proposed_action;
    } catch (error) {
      console.error("Error fetching employee from ID:", error);
      return [];
    }
}

export default getEmployeesActionByPersonID;