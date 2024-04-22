import api from ".";

const personRoute = '/people';

// Get all persons.
export const getAllPeople = async () => {
    try {
        const res = await api.get(personRoute);
        const persons: Person[] = await res.data.payload;
        return persons;
    } catch (err) {
        console.log(err);
    }
};

// Get a person by ID.
export const getPersonById = async (id: number) => {
    try {
        const res = await api.get(`${personRoute}/${id}`);
        const person: Person = await res.data.payload
        return person;
    } catch (err) {
        console.log(err);
    }
};

// Create a person.
export const createPerson = async (person: CreatePersonAttributes) => {
    try {
        const res = await api.post(personRoute, person);
        const action = await res.data.payload;
        return action;
    } catch (err) {
        console.log(err);
    }
};

// Modify a person.
export const modifyPerson = async (id: number, tPerson: Person) => {
    try {
        const res = await api.patch(`${personRoute}/${id}`, {data: tPerson});
        const person: Person = await res.data.payload;
        return person;
    } catch (err) {
        console.log(err);
    }
};

// Delete a person.
export const deletePerson = async (id: number) => {
    try {
        const res = await api.delete(personRoute, {data: {id}});
        const action = await res.data.payload;
        return action;
    } catch (err) {
        console.log(err);
    }
};