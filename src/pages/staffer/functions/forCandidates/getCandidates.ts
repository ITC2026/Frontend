import { getAllPeople } from "../../../../api/PersonAPI";
import { getAllApplications } from "../../../../api/ApplicationAPI";
import { getAllOpenings } from "../../../../api/OpeningAPI";
import { getPositionById } from "../../../../api/PositionAPI";
import { getProjectById } from "../../../../api/ProjectAPI";

//check if the person has no position, has apps rejected and or has apps accepted from closed projects
const checkPersonIsCandidate = async (id: number): Promise<boolean> => {
    try {
        //check if the person has no position or project is closed for more thorough validation 
        const openings = await getAllOpenings() as Opening[];
        const opening = openings.find((opening) => opening.person_id === id);

        if (opening) {
            const position = await getPositionById(opening.position_id as number);
            if (position) {
                const positionProject = await getProjectById(position.project_id as number);
                if (positionProject?.general_status === "Closed") {
                    return true;
                } else if (positionProject?.general_status === "Active" || positionProject?.general_status === "In Preparation") {
                    return false;
                }
            }
        }

        //check if the person has no position or has apps rejected and or has apps accepted from closed projects
        const applications = await getAllApplications() as Application[];
        if (applications) {
            //if the last aplication is rejected, we can assume the person has no position
            const applicationGeneral = applications.find((application) => application.person_id === id && (application.application_status !== "Accepted" && application.application_status !== "Rejected"));
            const applicationReject = applications.find((application) => application.person_id === id && application.application_status === "Rejected");
            const applicationAccept = applications.find((application) => application.person_id === id && application.application_status === "Accepted");


            //check if the person has no aplications but also check if it is in the position
            if (!applicationAccept && !applicationReject && !applicationGeneral) {
                return true;
            } else if (applicationGeneral) { //THIS CHECK IS NOT FINISHED, it should also check that this is the latest status
                return false;
            } else if (!!applicationReject) {
                return true;
            } else if (applicationAccept) {
                const appProject = await getProjectById(applicationAccept.position_id as number);
                if (appProject) {
                    if (appProject.general_status === "Closed") {
                        return true;
                    }
                    else if (appProject.general_status === "Active" || appProject.general_status === "In Preparation") {
                        return false;
                    }
                }
            }
        }

        return false;

    } catch (error) {
        console.error("Error fetching position from ID:", error);
        return false;
    }
};

const getCandidates = async (): Promise<Person[]> => {
    const people: Person[] = await getAllPeople() as Person[];

    const Candidates = await Promise.all(
        people.map(async (person) => {
            const isCandidate = await checkPersonIsCandidate(person.id);
            if (isCandidate) {
                return person;
            }
            return null;
        })
    );

    return Candidates
        .filter((postulate) => postulate !== null) as Person[];
}

export default getCandidates;