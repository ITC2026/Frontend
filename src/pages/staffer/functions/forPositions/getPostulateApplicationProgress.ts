import { getAllApplications } from "../../../../api/ApplicationAPI";
import { getAllOpenings } from "../../../../api/OpeningAPI";
const getPostulateApplicationProgress = async (positionID: number, postulates: Person[]) => {
    try {
        const openings = await getAllOpenings() as Opening[];
        const posOpenings = openings.filter((opening) => opening.position_id === positionID);
        const postulateOpening = posOpenings.find((opening) => postulates.map((postulate) => postulate.id).includes(opening.person_id)) as Opening;
        if (!postulateOpening) {
            const applications = await getAllApplications() as Application[];
            const posApplications = applications.filter((application) => application.position_id === positionID);
            const postulateApplication = posApplications.find((application) => postulates.map((postulate) => postulate.id).includes(application.person_id)) as Application;
            if (!postulateApplication) {
                return "No Progress";
            }
            return postulateApplication.application_status;
        }
        return postulateOpening.opening_status === "Filled" ? "Accepted" : "No Progress";
    } catch (error) {
        console.error("Error getting application status:", error);
        return "Error";
    }
};

export default getPostulateApplicationProgress;