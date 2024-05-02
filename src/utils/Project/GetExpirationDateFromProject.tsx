import { getProjectById } from "../../api/ProjectAPI";

export const getExpirationDateFromProject = async (
    projectId: string
): Promise<Date | null> => {
    try {
        const project = await getProjectById(Number(projectId));
        if (project?.has_expiration_date && project.expiration_date) {
            return new Date(project.expiration_date.expiration_date);
        }
        return null;
    } catch (error) {
        console.error("Error fetching expiration date from project:", error);
    }
    return null; // Return null if no expiration date is found
};