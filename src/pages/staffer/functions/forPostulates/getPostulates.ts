import { getAllPeople } from "../../../../api/PersonAPI";
import { getAllApplications } from "../../../../api/ApplicationAPI";
import { getProjectById } from "../../../../api/ProjectAPI";
import { getPositionById } from "../../../../api/PositionAPI";

//check if the person has  position and has apps accepted from active project
const checkPersonIsPostulate = async (id: number): Promise<boolean> => {
    try {
        //check if the person has no position or has apps rejected and or has apps accepted from closed projects
        const applications = await getAllApplications() as Application[];
        if (applications) {
            const applicationStatus = applications.find((application) => application.person_id === id && application.application_status !== "Accepted" && application.application_status !== "Rejected");
            if (applicationStatus) {
                const appPosition = await getPositionById(applicationStatus.position_id as number);
                if (appPosition) {
                    const appProject = await getProjectById(appPosition.project_id as number);
                    if (appProject) {
                        if (appProject.general_status === "Active" || appProject.general_status === "In Preparation") {
                            return true;
                        } else if (appProject.general_status === "Closed") {
                            return false;  
                        }
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