import { getAllPositions } from "../../../api/PositionAPI";

import getAllFilledOpenings from "./getAllFilledOpenings";

const getBillRateForBilling = async (id: number) => {
    try {

        console.log("ESTE ES EL ID DE TU PERSONA: ", id);

        const openings = await getAllFilledOpenings();
        if (!openings) {
            return "";
        }
        
        const jobPositions = await getAllPositions();
        if (!jobPositions) {
            return "";
        }

        const employeeOpening = openings.find((opening) => opening.person_id === id);
        if (!employeeOpening) {
            return "";
        }

        const openingJobPosition = jobPositions.find((jobPosition) => jobPosition.id === employeeOpening.position_id);
        if (!openingJobPosition) {
            return "";
        }

        return openingJobPosition.bill_rate;
    
    } catch (error) {
      console.error("Error fetching client from ID:", error);
      return "";
    }
};

export default getBillRateForBilling;