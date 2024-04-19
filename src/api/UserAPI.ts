import api from ".";
import { User } from "../types";

const userRoute = '/users';

// Get all users.
export const getAllUser = async () => {
    try {
        const res = await api.get(userRoute);
        const users: User[] = await res.data.payload;
        return users;
    } catch (err) {
        console.log(err);
    }
};

// Create a user.
export const createUser = async (user: User) => {
    try {
        const res = await api.post(userRoute, user);
        const action = await res.data.payload;
        return action;
    } catch (err) {
        console.log(err);
    }
};

// Delete a user.
export const deleteUser = async (id: number) => {
    try {
        const res = await api.delete(userRoute, {data: {id}});
        const action = await res.data.payload
        return action;
    } catch (err) {
        console.log(err);
    }
};

// Find a user by ID.
export const getUserById = async (id: number) => {
    try {
        const res = await api.get(`${userRoute}/${id}`);
        const user: User = await res.data.payload;
        return user;
    } catch (err) {
        console.log(err);
    }
};

// Modify a user.
export const modifyUser = async (id: number, tUser: User) => {
    try {
        const res = await api.patch(`${userRoute}/${id}`, {data: tUser});
        const user: User = await res.data.payload;
        return user;
    } catch (err) {
        console.log(err);
    }
};