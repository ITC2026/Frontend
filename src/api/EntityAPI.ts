import api from ".";
import { Entity } from "../types";

const entityRoute = '/entity';

// Get all entities.
export const getAllEntities = async () => {
    try {
        const res = await api.get(entityRoute);
        const entities: Entity[] = await res.data.payload;
        return entities;
    } catch (err) {
        console.log(err);
    }
};

// Get an entity by ID.
export const getEntityById = async (id: number) => {
    try {
        const res = await api.get(`${entityRoute}/${id}`);
        const entity: Entity = await res.data.payload
        return entity;
    } catch (err) {
        console.log(err);
    }
};

// Create an entity.
export const createEntity = async (entity: Entity) => {
    try {
        const res = await api.post(entityRoute, entity);
        const action = await res.data.payload;
        return action;
    } catch (err) {
        console.log(err);
    }
};

// Modify an entity.
export const modifyEntity = async (id: number, tEntity: Entity) => {
    try {
        const res = await api.patch(`${entityRoute}/${id}`, {data: tEntity});
        const entity: Entity = await res.data.payload;
        return entity;
    } catch (err) {
        console.log(err);
    }
};

// Delete an entity.
export const deleteEntity = async (id: number) => {
    try {
        const res = await api.delete(entityRoute, {data: {id}});
        const action = await res.data.payload;
        return action;
    } catch (err) {
        console.log(err);
    }
};