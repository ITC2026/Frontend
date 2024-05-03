import { getClientById } from "../../../../api/ClientAPI";
import { getProjectById } from "../../../../api/ProjectAPI";

const getDemandCuration = async (projectID : number, position: Position) => {
    try {
        const project = await getProjectById(projectID) as Project;
        const client = await getClientById(project.client_id as number) as Client;
        console.log("clien" + client);
        if (client?.high_growth === true && position.is_exclusive === true) {
            return "Strategic";
        } else if (client?.high_growth === false && position.is_exclusive === true) {
            return "Committed";
        } else  {
            return "Open";
        }
        return "No Demand Curation";
    } catch (error) {
        console.error("Error getting demand curation:", error);
        return "Error";
    }    
}

export default getDemandCuration;