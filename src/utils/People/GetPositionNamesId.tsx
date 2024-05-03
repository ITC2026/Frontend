import { getAllProjects } from "../../api/ProjectAPI";
import { Position } from "../../types";

interface Options { 
    id: string;
    name: string;
}
const getPositionNamesAndIds = async (): Promise<Options[]> => {
    try {
        const positionList: Position[] | undefined = await getAllProjects();
        if (!positionList) return [];
        const options = positionList.map((project) => ({
            id: project.id.toString(),
            name: project.position_title,
        }));
        return options;
    } catch (error) {
        console.error("Error fetching positions names and IDs:", error);
        return [];
    }
};

export default getPositionNamesAndIds;