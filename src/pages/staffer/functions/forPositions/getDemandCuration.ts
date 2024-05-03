import { getClientById } from "../../../../api/ClientAPI";
import { getProjectById } from "../../../../api/ProjectAPI";
import { getPositionById } from "../../../../api/PositionAPI";

const getDemandCuration = async (projectID: number, positionID: number) => {
    try {
        const position = await getPositionById(positionID) as Position;
        const project = await getProjectById(projectID) as Project;
        const client = await getClientById(project.client_id as number) as Client;
        const highGrowth = client?.high_growth as boolean;
        if (!position ||!position.is_exclusive) {
            console.error("Position not found or does not have an is_exclusive property");
            return "No Demand Curation";
        }
        const isExclusive = position.is_exclusive as boolean;
        if (highGrowth === true && isExclusive === true) {
            return "Strategic";
        } else if (highGrowth === false && isExclusive === true) {
            return "Committed";
        } else {
            return "Open";
        }
        return "No Demand Curation";
    } catch (error) {
        console.error("Error getting demand curation:", error);
        return "Error";
    }    
}

export default getDemandCuration;