import { getPositionOfPersonByID, getAllPeople } from "../../../api/PersonAPI";

const checkPersonIsPostulate = async (id: number): Promise<boolean> => {
    try {
        const position = await getPositionOfPersonByID(id);
        return !!position;
    } catch (error) {
        console.error("Error fetching position from ID:", error);
        return false;
    }
};

const getPostulates = async (): Promise<Person[]> => {
    const people: Person[] = await getAllPeople() as Person[];
    
    const postulates = await Promise.all(
        people.map(async (person) => {
            const isPostulate = await checkPersonIsPostulate(person.id);
            if (isPostulate) {
                return person;
            }
            return null;
        })
    );

    return postulates.filter((postulate) => postulate !== null) as Person[];
}

export default getPostulates;