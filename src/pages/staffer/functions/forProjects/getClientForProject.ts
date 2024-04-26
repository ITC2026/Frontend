import { getClientById } from "../../../../api/ClientAPI";
import { getProjectById } from "../../../../api/ProjectAPI";

const getClientIDofProject = async (id: number)  => {
    try {
        const project = await getProjectById(id);
        if (!project) return 0;
        const { client_id } = project;
        return client_id;
    } catch (err) {
        console.error("Error fetching project from ID:", err);
        return 0;
    }
}



const getClientNameByProjectID = async (id: number)  => {
    try {
        const num = await getClientIDofProject(id);
        const client = await getClientById(num);
        if (!client) return "No Client Found";
        const clientName = client.client_name.toString() as string;
        return clientName;
    } catch (err) {
        console.error("Error fetching client from ID:", err);
        return "";
    }
};

export default getClientNameByProjectID;