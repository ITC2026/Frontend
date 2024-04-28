import { getPersonById } from "../../../api/PersonAPI";

const getPersonTechStackByID = async (id: number) => {
    try {
        const person = await getPersonById(id);
        if (!person) return "No Person Found";
        const personName = person.tech_stack.toString();
        return personName;
    }
    catch (error) {
        console.error("Error fetching person from ID:", error);
        return "";
    }
};

export default getPersonTechStackByID;