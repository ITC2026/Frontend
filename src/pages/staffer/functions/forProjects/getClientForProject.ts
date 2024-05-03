import { getClientById } from "../../../../api/ClientAPI";
import { getProjectById } from "../../../../api/ProjectAPI";

const getClientIDofProject = async (id: number): Promise<number> => {
    try {
        const project = await getProjectById(id);
        if (!project) return 0;
        return project.client_id as number;
    } catch (error) {
        console.error("Error fetching project from ID:", error);
        return 0;
    }
};

const getClientNameByProjectID = async (id: number): Promise<string> => {
    try {
        const clientId = await getClientIDofProject(id);
        const client = await getClientById(clientId);
        if (!client) return "No Client Found";
        return client.client_name.toString();
    } catch (error) {
        console.error("Error fetching client from ID:", error);
        return "";
    }
};

export default getClientNameByProjectID;