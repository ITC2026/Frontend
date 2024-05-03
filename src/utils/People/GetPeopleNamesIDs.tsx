import { getAllPeople } from "../../api/PersonAPI";

interface PersonData {
    id: number;
    first_name: string;
    last_name: string;
}
 
const getAllPeopleNamesIDs = async (): Promise<PersonData[]> => {
    try {
        const peopleList: Person[] | undefined = await getAllPeople()!;
        if (!peopleList) return [];
        const person = peopleList.map((person) => ({
            id: person.id,
            first_name: person.first_name,
            last_name: person.last_name,
        }));
        return person;
    } catch (error) {
        console.error("Error fetching people names and IDs:", error);
        return [];
    }
};

export default getAllPeopleNamesIDs;