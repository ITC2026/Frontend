import { getUserById } from '../../../../api/UserAPI';

const getAMUsernameForProject = async (id: number) => {
    try {
        const user = await getUserById(id);
        if (!user) return "No User Found";
        const username = user.username.toString();
        return username;
    } catch (err) {
        console.error("Error fetching user from ID:", err);
        return "";
    }
}

export default getAMUsernameForProject;