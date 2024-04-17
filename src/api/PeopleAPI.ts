import api from ".";
import { Person } from "../types";

const peopleRoute = "/people"

export const getAllPeople = async () => {
  try {
    const res = await api.get(peopleRoute);
    const people: Person[] = await res.data.payload;
    return people;
  } catch (err) {
    console.log(err);
  }
};

export const createPerson = async (Person: Person) => {
  try {
    const res = await api.post(peopleRoute, Person);
    const action = await res.data.payload;
    return action;
  } catch (err) {
    console.log(err);
  }
};

export const deletePerson = async (id: number) => {
  try {
    const res = await api.delete(peopleRoute, { data: { id } });
    const action = await res.data.payload;
    return action;
  } catch (err) {
    console.log(err);
  }
};

export const getPersonById = async (id: number) => {
  try {
    const res = await api.get(`${peopleRoute}/${id}`);
    const Person: Person = await res.data.payload;
    return Person;
  } catch (err) {
    console.log(err);
  }
};

export const modifyPerson= async (id: number, tPerson: Person) => {
  try {
    const res = await api.patch(`${peopleRoute}/${id}`, { data: tPerson });
    const Person: Person = await res.data.payload;
    return Person;
  } catch (err) {
    console.log(err);
  }
};
