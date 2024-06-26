import api from ".";

const employeeRoute = '/employees';

// Get all employees.
export const getAllEmployees = async () => {
    try {
        const res = await api.get(employeeRoute);
        const employees: Employee[] = await res.data.payload;
        return employees;
    } catch (err) {
        console.log(err);
    }
};

// Get an employee by ID.
export const getEmployeeById = async (id: number) => {
    try {
        const res = await api.get(`${employeeRoute}/${id}`);
        const employee: Employee = await res.data.payload
        return employee;
    } catch (err) {
        console.log(err);
    }
};

// Create an employee.
export const createEmployee = async (employee: CreateEmployeeAttributes) => {
    try {
        const res = await api.post(employeeRoute, employee);
        const action = await res.data.payload;
        return action;
    } catch (err) {
        console.log(err);
    }
};

// Modify an employee.
export const modifyEmployee = async (id: number, temployee: Employee) => {
    try {
        const res = await api.patch(`${employeeRoute}/${id}`, {data: temployee});
        const employee: Employee = await res.data.payload;
        return employee;
    } catch (err) {
        console.log(err);
    }
};

// Delete an employee.
export const deleteEmployee = async (id: number) => {
    try {
        const res = await api.delete(employeeRoute, {data: {id}});
        const action = await res.data.payload;
        return action;
    } catch (err) {
        console.log(err);
    }
};

export const getEmployeeByPersonID = async (id: number) => {
    try {
        const res = await api.get(employeeRoute);
        const employees_by_person: Employee[] = await res.data.payload;
        const employee_by_person = employees_by_person.find((employee) => employee.person_id === id);
        if (!employee_by_person) {
            return "";
        }
        return employee_by_person || null;

    } catch (error) {
      console.error("Error fetching employee from ID:", error);
      return null;
    }
}

export const getEmployeeByIdAndDates = async (id: number) => {
    try {
        const res = await api.get(`${employeeRoute}/${id}`);
        const employee: GetEmployeeAttributes = await res.data.payload
        console.log(employee);
        return employee;
    } catch (err) {
        console.log(err);
    }
};