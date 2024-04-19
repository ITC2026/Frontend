import api from ".";
import { Application } from "../types";

const applicationRoute ='/applications';

// Get all applications.
export const getAllApplications = async () => {
    try {
        const res = await api.get(applicationRoute);
        const applications: Application[] = await res.data.payload;
        return applications;
    } catch (err) {
        console.log(err);
    }
};

// Get an application by ID.
export const getApplicationById = async (id: number) => {
    try {
        const res = await api.get(`${applicationRoute}/${id}`);
        const application: Application = await res.data.payload
        return application;
    } catch (err) {
        console.log(err);
    }
};

// Create an application.
export const createApplication = async (application: Application) => {
    try {
        const res = await api.post(applicationRoute, application);
        const action = await res.data.payload;
        return action;
    } catch (err) {
        console.log(err);
    }
};

// Modify an application.
export const modifyApplication = async (id: number, tApplication: Application) => {
    try {
        const res = await api.patch(`${applicationRoute}/${id}`, {data: tApplication});
        const application: Application = await res.data.payload;
        return application;
    } catch (err) {
        console.log(err);
    }
};

// Delete an application.
export const deleteApplication = async (id: number) => {
    try {
        const res = await api.delete(applicationRoute, {data: {id}});
        const action = await res.data.payload;
        return action;
    } catch (err) {
        console.log(err);
    }
};