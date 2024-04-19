import api from ".";
import { Employee } from "../types";

const employeeRoute = '/employee';

// Get all employees.
export const getAllEmployee = async () => {
    try {
        const res = await api.get(employeeRoute);
        const employees: Employee[] = await res.data.payload;
        return employees;
    } catch (err) {
        console.log(err);
    }
};

// Create a employee.
export const createEmployee = async (employee: Employee) => {
    try {
        const res = await api.post(employeeRoute, employee);
        const action = await res.data.payload;
        return action;
    } catch (err) {
        console.log(err);
    }
};

// Delete a employee.
export const deleteEmployee = async (id: number) => {
    try {
        const res = await api.delete(employeeRoute, {data: {id}});
        const action = await res.data.payload
        return action;
    } catch (err) {
        console.log(err);
    }
};

// Find a employee by ID.
export const getEmployeeById = async (id: number) => {
    try {
        const res = await api.get(`${employeeRoute}/${id}`);
        const employee: Employee = await res.data.payload;
        return employee;
    } catch (err) {
        console.log(err);
    }
};

// Modify a employee.
export const modifyEmployee = async (id: number, tEmployee: Employee) => {
    try {
        const res = await api.patch(`${employeeRoute}/${id}`, {data: tEmployee});
        const employee: Employee = await res.data.payload;
        return employee;
    } catch (err) {
        console.log(err);
    }
};