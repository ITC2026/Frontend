import api from ".";
import { TicketLog } from "../types";

const ticketlogRoute = '/ticketlog';

// Get all ticketlogs.
export const getAllTicketLog = async () => {
    try {
        const res = await api.get(ticketlogRoute);
        const ticketlogs: TicketLog[] = await res.data.payload;
        return ticketlogs;
    } catch (err) {
        console.log(err);
    }
};

// Create a ticketlog.
export const createTicketLog = async (ticketlog: TicketLog) => {
    try {
        const res = await api.post(ticketlogRoute, ticketlog);
        const action = await res.data.payload;
        return action;
    } catch (err) {
        console.log(err);
    }
};

// Delete a ticketlog.
export const deleteTicketLog = async (id: number) => {
    try {
        const res = await api.delete(ticketlogRoute, {data: {id}});
        const action = await res.data.payload
        return action;
    } catch (err) {
        console.log(err);
    }
};

// Find a ticketlog by ID.
export const getTicketLogById = async (id: number) => {
    try {
        const res = await api.get(`${ticketlogRoute}/${id}`);
        const ticketlog: TicketLog = await res.data.payload;
        return ticketlog;
    } catch (err) {
        console.log(err);
    }
};

// Modify a ticketlog.
export const modifyTicketLog = async (id: number, tTicketLog: TicketLog) => {
    try {
        const res = await api.patch(`${ticketlogRoute}/${id}`, {data: tTicketLog});
        const ticketlog: TicketLog = await res.data.payload;
        return ticketlog;
    } catch (err) {
        console.log(err);
    }
};