import { getAllClients } from "../../api/ClientAPI";

const getClientFromID = async (id: number): Promise<string> => {
  try {
    const clientList = await getAllClients();
    if (!clientList) return "";
    const client = clientList.find((client) => client.id === id);
    if (!client) return "";
    return client.client_name;
  } catch (error) {
    console.error("Error fetching client from ID:", error);
    return "";
  }
};
export default getClientFromID;
