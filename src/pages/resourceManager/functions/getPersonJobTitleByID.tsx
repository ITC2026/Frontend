import { getPersonById } from "../../../api/PersonAPI";

const getPersonJobTitleByID = async (id: number) => {
    try {
        const person = await getPersonById(id);
        if (!person) return "No Person Found";
        const personName = person.title.toString();
        return personName;
    }
    catch (error) {
        console.error("Error fetching person title from ID:", error);
        return "";
    }
};

export default getPersonJobTitleByID;