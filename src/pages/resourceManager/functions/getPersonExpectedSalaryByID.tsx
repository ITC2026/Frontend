import { getPersonById } from "../../../api/PersonAPI";

const getPersonExpectedSalaryByID = async (id: number) => {
    try {
        const person = await getPersonById(id);
        if (!person) return "No Person Found";
        const personName = person.expected_salary
        return personName;
    }
    catch (error) {
        console.error("Error fetching person expected salary from ID:", error);
        return "";
    }
};

export default getPersonExpectedSalaryByID;