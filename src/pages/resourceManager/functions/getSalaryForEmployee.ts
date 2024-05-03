
import { getAllEmployees } from "../../../api/EmployeeAPI";


const getSalaryForEmployee = async (id: number) => {
    try {

        const employees = await getAllEmployees();
        if (!employees) {
            return "";
        }

        const employee = employees.find((employee) => employee.person_id === id);
        if (!employee) {
            return "";
        }

        return employee.salary;
    } catch (error) {
      console.error("Error fetching client from ID:", error);
      return "";
    }
};

export default getSalaryForEmployee;