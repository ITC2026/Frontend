import api from ".";

const roleRoute = '/roles';

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

// Modify a Role.
export const modifyRole = async (id: number, tRole: Role) => {
    try {
        const res = await api.patch(`${roleRoute}/${id}`, {data: tRole});
        const role: Role = await res.data.payload;
        return role;
    } catch (err) {
        console.log(err);
    }
};

// Delete a Role.
export const deleteRole = async (id: number) => {
    try {
        const res = await api.delete(roleRoute, {data: {id}});
        const action = await res.data.payload
        return action;
    } catch (err) {
        console.log(err);
    }
};