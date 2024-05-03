import { getAllClients } from "../../api/ClientAPI";
import { Client } from "../../types";

interface Options { 
    id: string;
    name: string;
}
const getClientNamesAndIds = async (): Promise<Options[]> => {
    try {
        const clientList: Client[] | undefined = await getAllClients()!;
        if (!clientList) return [];
        const options = clientList.map((client) => ({
            id: client.id.toString(),
            name: client.client_name,
        }));
        return options;
    } catch (error) {
        console.error("Error fetching client names and IDs:", error);
        return [];
    }
};

export default getClientNamesAndIds;