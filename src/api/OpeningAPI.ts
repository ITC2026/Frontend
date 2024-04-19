import api from ".";
import { Opening } from "../types";

const openingRoute = '/opening';

// Get all openings.
export const getAllOpening = async () => {
    try {
        const res = await api.get(openingRoute);
        const openings: Opening[] = await res.data.payload;
        return openings;
    } catch (err) {
        console.log(err);
    }
};

// Create a opening.
export const createOpening = async (opening: Opening) => {
    try {
        const res = await api.post(openingRoute, opening);
        const action = await res.data.payload;
        return action;
    } catch (err) {
        console.log(err);
    }
};

// Delete a opening.
export const deleteOpening = async (id: number) => {
    try {
        const res = await api.delete(openingRoute, {data: {id}});
        const action = await res.data.payload
        return action;
    } catch (err) {
        console.log(err);
    }
};

// Find a opening by ID.
export const getOpeningById = async (id: number) => {
    try {
        const res = await api.get(`${openingRoute}/${id}`);
        const opening: Opening = await res.data.payload;
        return opening;
    } catch (err) {
        console.log(err);
    }
};

// Modify a opening.
export const modifyOpening = async (id: number, tOpening: Opening) => {
    try {
        const res = await api.patch(`${openingRoute}/${id}`, {data: tOpening});
        const opening: Opening = await res.data.payload;
        return opening;
    } catch (err) {
        console.log(err);
    }
};