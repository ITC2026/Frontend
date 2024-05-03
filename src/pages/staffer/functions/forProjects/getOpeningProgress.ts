import { getAllOpenings } from "../../../../api/OpeningAPI";
import { getAllPositions } from "../../../../api/PositionAPI";

const getFilledAndTotal = async (position_id: number) => {
    const openings = await getAllOpenings() as Opening[];
    const projectOpenings : Opening[]= openings.filter((opening :Opening) => opening.position_id === position_id);
    const totalOpenings = projectOpenings.length;
    const completedOpenings = projectOpenings.filter((opening) => opening.opening_status === "Filled").length;
    return { totalOpenings, completedOpenings };
}

const getOpeningProgress = async (project_id: number) => {
    const allPositions = await getAllPositions() as Position[];
    const positions = allPositions.filter((position) => position.project_id === project_id);
    if (positions.length === 0) {
        return "No Positions"
    }
    var completedOpenings = 0;
    var totalOpenings = 0;
    for (const position of positions) {
        const { totalOpenings: total, completedOpenings: completed } = await getFilledAndTotal(position.id);
        completedOpenings += completed;
        totalOpenings += total;
    }
    if (totalOpenings === 0) {
        return "0%";
    }
    return `${(completedOpenings / totalOpenings) * 100}%`;
}
export default getOpeningProgress;