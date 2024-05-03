import { getAllApplications } from "../../../../api/ApplicationAPI";
import getPostulates from "../forPostulates/getPostulates";

export const fetchPositionsData = async (positionID: number) => {
    try {
        const people = await getPostulates();
        const applications = await getAllApplications();

        if (!people || !applications) {
            throw new Error("Error fetching data");
        }

        const positionsData = people.map((person) => {
            const personApplications = applications.filter((application) => application.person_id === person.id && application.position_id === positionID);
            const latestApplication = personApplications[personApplications.length - 1];

            return {
                candidate_name: person.name,
                application_status: latestApplication?.application_status,
                company_status: person.status,
            };
        });

        return positionsData;
    } catch (error) {
        console.error("Error fetching position data:", error);
    }
};
