import { getAllPositions } from "../../../../api/PositionAPI";

const getProjectPositions = async (projectID: number) :  Promise<Position[]> => {
    const allPositions = await getAllPositions() as Position[];
    const projectPositions = allPositions.filter((position) => position.project_id === projectID);
    return projectPositions;
}

export default getProjectPositions;