import { getAllClients } from "../../api/ClientAPI";
import { useEffect, useState } from "react";
import { Client } from "../../types";

const useClientNames = (): string[] => {
  const [clientNames, setClientNames] = useState<string[]>([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllClients();
        const clients = data as Client[];
        const names = clients.map((client) => client.client_name);
        setClientNames(names);
        console.log(`Client names fetched: ${names}`);
        setIsDataFetched(true);
      } catch (error) {
        console.error("Error fetching client names:", error);
      }
    };

    fetchData();
  }, []);

  return isDataFetched ? clientNames : [];
};

export default useClientNames;
