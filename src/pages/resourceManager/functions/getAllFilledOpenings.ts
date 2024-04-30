import { getAllOpenings } from "../../../api/OpeningAPI";

const getAllFilledOpenings = async () => {
    try {
        const openings = await getAllOpenings();
        if (!openings) {
            return [];
        }
        const filledOpenings = openings.filter((opening) => opening.person_id !== null);
        return filledOpenings;
    } catch (error) {
      console.error("Error fetching filled openings:", error);
      return [];
    }
};

export default getAllFilledOpenings;