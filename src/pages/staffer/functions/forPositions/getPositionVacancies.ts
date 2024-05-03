import { getAllOpenings } from "../../../../api/OpeningAPI";


const getPositionVacancies = async (positionID: number) => {
    try {
        const openings = await getAllOpenings() as Opening[];
        const posOpenings = openings.filter((opening) => opening.position_id === positionID && opening.opening_status !== "Filled");
        return posOpenings.length;
    } catch (error) {
        console.error("Error getting position vacancies:", error);
        return 0;
    }
}

export default getPositionVacancies;