import api from ".";
import { TicketLog } from "../types";

const ticketLogRoute = '/ticketlog';

// Se determinó que no es necesario modificar ni eliminar un TicketLog.

// Get all TicketLogs.
export const getAllTicketLogs = async () => {
    try {
        const res = await api.get(ticketLogRoute);
        const ticketLogs: TicketLog[] = await res.data.payload;
        return ticketLogs;
    } catch (err) {
        console.log(err);
    }
};

// Get a TicketLog by ID.
export const getTicketLogById = async (id: number) => {
    try {
        const res = await api.get(`${ticketLogRoute}/${id}`);
        const ticketLog: TicketLog = await res.data.payload
        return ticketLog;
    } catch (err) {
        console.log(err);
    }
};

// Create a TicketLog.
export const createTicketLog = async (ticketLog: TicketLog) => {
    try {
        const res = await api.post(ticketLogRoute, ticketLog);
        const action = await res.data.payload;
        return action;
    } catch (err) {
        console.log(err);
    }
};
