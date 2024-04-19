import api from ".";
import { Position } from "../types";

const positionRoute = '/position';

// Get all positions.
export const getAllPosition = async () => {
    try {
        const res = await api.get(positionRoute);
        const positions: Position[] = await res.data.payload;
        return positions;
    } catch (err) {
        console.log(err);
    }
};

// Create a position.
export const createPosition = async (position: Position) => {
    try {
        const res = await api.post(positionRoute, position);
        const action = await res.data.payload;
        return action;
    } catch (err) {
        console.log(err);
    }
};

// Delete a position.
export const deletePosition = async (id: number) => {
    try {
        const res = await api.delete(positionRoute, {data: {id}});
        const action = await res.data.payload
        return action;
    } catch (err) {
        console.log(err);
    }
};

// Find a position by ID.
export const getPositionById = async (id: number) => {
    try {
        const res = await api.get(`${positionRoute}/${id}`);
        const position: Position = await res.data.payload;
        return position;
    } catch (err) {
        console.log(err);
    }
};

// Modify a position.
export const modifyPosition = async (id: number, tPosition: Position) => {
    try {
        const res = await api.patch(`${positionRoute}/${id}`, {data: tPosition});
        const position: Position = await res.data.payload;
        return position;
    } catch (err) {
        console.log(err);
    }
};