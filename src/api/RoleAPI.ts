import api from ".";
import { Role } from "../types";

const roleRoute = '/role';

// Se determinó que no es necesario modificar ni eliminar un Rol.

// Get all roles.
export const getAllRoles = async () => {
    try {
        const res = await api.get(roleRoute);
        const roles: Role[] = await res.data.payload;
        return roles;
    } catch (err) {
        console.log(err);
    }
};

// Get a role by ID.
export const getRoleById = async (id: number) => {
    try {
        const res = await api.get(`${roleRoute}/${id}`);
        const role: Role = await res.data.payload
        return role;
    } catch (err) {
        console.log(err);
    }
};

// Create a role.
export const createRole = async (role: Role) => {
    try {
        const res = await api.post(roleRoute, role);
        const action = await res.data.payload;
        return action;
    } catch (err) {
        console.log(err);
    }
};
