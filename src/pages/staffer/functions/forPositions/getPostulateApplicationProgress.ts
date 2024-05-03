import { getAllApplications } from "../../../../api/ApplicationAPI";
import { getAllOpenings } from "../../../../api/OpeningAPI";

const getPostulateApplicationProgress = async (positionID: number, postulateID: number) => {
    try {
        // Fetch all openings and filter those relevant to the given position
        const openings = await getAllOpenings() as Opening[];
        const posOpenings = openings.filter((opening) => opening.position_id === positionID);
        
        // Find the specific opening related to the postulate ID
        const postulateOpening = posOpenings.find((opening) => opening.person_id === postulateID);

        // If an opening exists and it is filled, return "Accepted"
        if (postulateOpening && postulateOpening.opening_status === "Filled") {
            return "Accepted";
        }

        // If no relevant opening is filled, check applications
        const applications = await getAllApplications() as Application[];
        const posApplications = applications.filter((application) => application.position_id === positionID);
        const postulateApplication = posApplications.find((application) => application.person_id === postulateID);

        // Return the application status if an application exists, otherwise "No Progress"
        return postulateApplication ? postulateApplication.application_status : "No Progress";
    } catch (error) {
        console.error("Error getting application status:", error);
        return "Error";
    }
};

export default getPostulateApplicationProgress; 