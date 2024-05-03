import { getPositionById } from "../../api/PositionAPI";
export const getOpeningsFromJobID = async (jobID: number) => {
    const position = await getPositionById(jobID);
    return position?.openings.map((opening) => opening.opening_status);
};
