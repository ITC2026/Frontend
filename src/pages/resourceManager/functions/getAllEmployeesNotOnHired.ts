import { getAllEmployees } from "../../../api/EmployeeAPI";

const getAllEmployeesOnHired = async () => {
  try {
    const employees = await getAllEmployees();
    if (!employees) {
      return [];
    }
    const employeesOnHired = employees.filter((employee) => employee.employee_status !== "On Hired");
    return employeesOnHired;
  } catch (error) {
    console.error("Error fetching employees on hired:", error);
    return [];
  }
};

export default getAllEmployeesOnHired;