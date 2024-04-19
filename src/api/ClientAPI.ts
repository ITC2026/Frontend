import api from ".";
import { Client } from "../types";

const clientRoute = '/clients'

// Get all clients.
export const getAllClients = async () => {
    try {
      const res = await api.get(clientRoute);
      const clients: Client[] = await res.data.payload;
      return clients;
    } catch (err) {
      console.log(err);
    }
};
  
// Create a client.
export const createClient = async (client: Client) => {
    try {
        const res = await api.post(clientRoute, client);
        const action = await res.data.payload;
        return action;
    } catch (err) {
        console.log(err);
    }
};
  
// Delete a client.
export const deleteClient = async (id: number) => {
    try {
        const res = await api.delete(clientRoute, {data: {id}});
        const action = await res.data.payload;
        return action;
    } catch (err) {
        console.log(err);
    }
};
  
// Find a client by ID.
export const getClientById = async (id: number) => {
    try {
        const res = await api.get(`${clientRoute}/${id}`);
        const client: Client = await res.data.payload;
        return client;
    } catch (err) {
        console.log(err);
    }
};

// Modify a client.
export const modifyClient = async (id: number, tClient: Client) => {
    try {
        const res = await api.patch(`${clientRoute}/${id}`, {data: tClient});
        const client: Client = await res.data.payload;
        return client;
    } catch (err) {
        console.log(err);
    }
};