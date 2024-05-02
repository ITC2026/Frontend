import axios from 'axios';
import { getAllPeople } from "../../../../api/PersonAPI";
import { getAllApplications } from "../../../../api/ApplicationAPI";

export const fetchPositionsData = async () => {
    try {
        const people = await getAllPeople();
        const applications = await getAllApplications();

        if (!people || !applications) {
            throw new Error("Error fetching data");
        }

        const positionsData = people.map((person) => {
            const personApplications = applications.filter((application) => application.person_id === person.id);
            const latestApplication = personApplications[personApplications.length - 1];

            return {
                candidate_name: person.name,
                application_status: latestApplication?.application_status,
                company_status: person.status,
            };
        });

        const response = await axios.post('http://localhost:5173/staffer/projects/positions', positionsData);

        if (response.status !== 200) {
            throw new Error('Error posting data to API');
        }

        return positionsData;
    } catch (error) {
        console.error("Error fetching position data:", error);
    }
};
