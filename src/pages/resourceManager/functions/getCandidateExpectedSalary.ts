import { getAllCandidates } from "../../../api/CandidateAPI";

const getCandidateExpectedSalary = async (id: number) => {
    try {
        const employees = await getAllCandidates();
        if (!employees) {
            return 0;
        }
        const employee = employees.find((employee) => employee.person_id === id);
        if (!employee) {
            return 0;
        }
        return employee.expected_salary;
    } catch (error) {
      console.error("Error fetching employee from ID:", error);
      return 0;
    }
}

export default getCandidateExpectedSalary;