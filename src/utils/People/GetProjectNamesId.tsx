import { getAllProjects } from "../../api/ProjectAPI";
import { Project } from "../../types";

interface Options { 
    id: string;
    name: string;
}
const getProjectNamesAndIds = async (): Promise<Options[]> => {
    try {
        const projectList: Project[] | undefined = await getAllProjects();
        if (!projectList) return [];
        const options = projectList.map((project) => ({
            id: project.id.toString(),
            name: project.project_title,
        }));
        return options;
    } catch (error) {
        console.error("Error fetching projects names and IDs:", error);
        return [];
    }
};

export default getProjectNamesAndIds;