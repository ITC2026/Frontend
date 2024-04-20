import api from ".";

const closedProjectRoute = '/closedprojects';

// Get all closed projects.
export const getAllClosedProjects = async () => {
    try {
        const res = await api.get(closedProjectRoute);
        const closedProjects: ClosedProject[] = await res.data.payload;
        return closedProjects;
    } catch (err) {
        console.log(err);
    }
};

// Get a closed project by ID.
export const getClosedProjectById = async (id: number) => {
    try {
        const res = await api.get(`${closedProjectRoute}/${id}`);
        const closedproject: ClosedProject = await res.data.payload
        return closedproject;
    } catch (err) {
        console.log(err);
    }
};

// Create a closed project.
export const createClosedProject = async (closedProject: ClosedProject) => {
    try {
        const res = await api.post(closedProjectRoute, closedProject);
        const action = await res.data.payload;
        return action;
    } catch (err) {
        console.log(err);
    }
};

// Modify a closed project.
export const modifyClosedProject = async (id: number, tClosedProject: ClosedProject) => {
    try {
        const res = await api.patch(`${closedProjectRoute}/${id}`, {data: tClosedProject});
        const closedProject: ClosedProject = await res.data.payload;
        return closedProject;
    } catch (err) {
        console.log(err);
    }
};

// Delete a closed project.
export const deleteClosedProject = async (id: number) => {
    try {
        const res = await api.delete(closedProjectRoute, {data: {id}});
        const action = await res.data.payload;
        return action;
    } catch (err) {
        console.log(err);
    }
};