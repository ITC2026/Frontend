import { getAllPeople } from "../../../../api/PersonAPI";
import { getAllApplications } from "../../../../api/ApplicationAPI";
import { getAllOpenings } from "../../../../api/OpeningAPI";

const getPostulatesForPosition = async (positionID: number) => {
    try {
        const postulates = await getAllPeople() as Person[];
        const applications = await getAllApplications() as Application[];
        const openings = await getAllOpenings() as Opening[]; 
        const posApps = applications.filter((application) => application.position_id === positionID);
        console.log(posApps);
        const posOpenings = openings.filter((opening) => opening.position_id === positionID);   
        console.log(posOpenings);
        const postulatesForPosition : Person[] = postulates.filter((postulate) =>  
            posOpenings.some((pos) => pos.person_id === postulate.id)) as Person[];
        const postulatesForPositionApps : Person[] = postulates.filter((postulate) =>
            posApps.some((pos) => pos.person_id === postulate.id)) as Person[];

        const allPostulates = postulatesForPositionApps.concat(postulatesForPosition);
        return allPostulates;            
    }
    catch (error) {
        console.error("Error fetching position data:", error);
    }
}

export default getPostulatesForPosition;