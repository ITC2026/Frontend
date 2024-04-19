import api from ".";
import { ExpirationDateOpening } from "../types";

const expirationDateOpeningRoute = '/expirationdateopenings';

// Get all opening expiration dates.
export const getAllExpirationDateOpenings = async () => {
    try {
        const res = await api.get(expirationDateOpeningRoute);
        const expirationDateOpening: ExpirationDateOpening[] = await res.data.payload;
        return expirationDateOpening;
    } catch (err) {
        console.log(err);
    }
};

// Get an opening expiration date by ID.
export const getExpirationDateOpeningById = async (id: number) => {
    try {
        const res = await api.get(`${expirationDateOpeningRoute}/${id}`);
        const expirationDateOpening: ExpirationDateOpening = await res.data.payload
        return expirationDateOpening;
    } catch (err) {
        console.log(err);
    }
};

// Create an opening expiration date.
export const createExpirationDateOpening = async (expirationDateOpening: ExpirationDateOpening) => {
    try {
        const res = await api.post(expirationDateOpeningRoute, expirationDateOpening);
        const action = await res.data.payload;
        return action;
    } catch (err) {
        console.log(err);
    }
};

// Modify an opening expiration date.
export const modifyExpirationDateOpening = async (id: number, tExpirationDateOpening: ExpirationDateOpening) => {
    try {
        const res = await api.patch(`${expirationDateOpeningRoute}/${id}`, {data: tExpirationDateOpening});
        const expirationDateOpening: ExpirationDateOpening = await res.data.payload;
        return expirationDateOpening;
    } catch (err) {
        console.log(err);
    }
};

// Delete an opening expiration date.
export const deleteExpirationDateOpening = async (id: number) => {
    try {
        const res = await api.delete(expirationDateOpeningRoute, {data: {id}});
        const action = await res.data.payload;
        return action;
    } catch (err) {
        console.log(err);
    }
};