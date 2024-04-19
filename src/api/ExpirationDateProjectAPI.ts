import api from ".";
import { ExpirationDateProject } from "../types";

const expirationDateProjectRoute = '/expirationdateprojects';

// Get all project expiration dates.
export const getAllExpirationDateProjects = async () => {
    try {
        const res = await api.get(expirationDateProjectRoute);
        const expirationDateProject: ExpirationDateProject[] = await res.data.payload;
        return expirationDateProject;
    } catch (err) {
        console.log(err);
    }
};

// Get a project expiration date by ID.
export const getExpirationDateProjectById = async (id: number) => {
    try {
        const res = await api.get(`${expirationDateProjectRoute}/${id}`);
        const expirationDateProject: ExpirationDateProject = await res.data.payload
        return expirationDateProject;
    } catch (err) {
        console.log(err);
    }
};

// Create a project expiration date.
export const createExpirationDateProject = async (expirationDateProject: ExpirationDateProject) => {
    try {
        const res = await api.post(expirationDateProjectRoute, expirationDateProject);
        const action = await res.data.payload;
        return action;
    } catch (err) {
        console.log(err);
    }
};

// Modify a project expiration date.
export const modifyExpirationDateProject = async (id: number, tExpirationDateProject: ExpirationDateProject) => {
    try {
        const res = await api.patch(`${expirationDateProjectRoute}/${id}`, {data: tExpirationDateProject});
        const expirationDateProject: ExpirationDateProject = await res.data.payload;
        return expirationDateProject;
    } catch (err) {
        console.log(err);
    }
};

// Delete a project expiration date.
export const deleteExpirationDateProject = async (id: number) => {
    try {
        const res = await api.delete(expirationDateProjectRoute, {data: {id}});
        const action = await res.data.payload;
        return action;
    } catch (err) {
        console.log(err);
    }
};