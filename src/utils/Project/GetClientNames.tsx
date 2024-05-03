import { getAllClients } from "../../api/ClientAPI";
import { Client } from "../../types";

const getAllClientNames = async (): Promise<string[]> => {
    try {
        const clientList: Client[] | undefined = await getAllClients()!;
        if (!clientList) return [];
        const options = clientList.map((client) => client.client_name);
        return options;
    } catch (error) {
        console.error("Error fetching client names:", error);
        return [];
    }
}

export default getAllClientNames; 