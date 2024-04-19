import api from ".";
import { Application } from "../types";

const applicationRoute = '/application';

// Get all applications.
export const getAllApplication = async () => {
    try {
        const res = await api.get(applicationRoute);
        const applications: Application[] = await res.data.payload;
        return applications;
    } catch (err) {
        console.log(err);
    }
};

// Create a application.
export const createApplication = async (application: Application) => {
    try {
        const res = await api.post(applicationRoute, application);
        const action = await res.data.payload;
        return action;
    } catch (err) {
        console.log(err);
    }
};

// Delete a application.
export const deleteApplication = async (id: number) => {
    try {
        const res = await api.delete(applicationRoute, {data: {id}});
        const action = await res.data.payload
        return action;
    } catch (err) {
        console.log(err);
    }
};

// Find a application by ID.
export const getApplicationById = async (id: number) => {
    try {
        const res = await api.get(`${applicationRoute}/${id}`);
        const application: Application = await res.data.payload;
        return application;
    } catch (err) {
        console.log(err);
    }
};

// Modify a application.
export const modifyApplication = async (id: number, tApplication: Application) => {
    try {
        const res = await api.patch(`${applicationRoute}/${id}`, {data: tApplication});
        const application: Application = await res.data.payload;
        return application;
    } catch (err) {
        console.log(err);
    }
};