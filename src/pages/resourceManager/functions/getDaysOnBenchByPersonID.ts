import { getAllEmployees } from "../../../api/EmployeeAPI";

const getDaysOnBenchByPersonID = async (id: number) => {
    try {
        const employees = await getAllEmployees();
        if (!employees) {
            return [];
        }
        const employee = employees.find((employee) => employee.person_id === id);
        if (!employee) {
            console.error('Employee not found with id:', id);
            return [];
        }
        const onBenchSince = employee.last_movement_at;
        const today = new Date();
        const daysOnBench = Math.floor((today.getTime() - new Date(onBenchSince).getTime()) / (1000 * 60 * 60 * 24));
        return daysOnBench.toString();
    } catch (error) {
        console.error('Error getting days on bench:', error);
        return [];
    }
}

export default getDaysOnBenchByPersonID;