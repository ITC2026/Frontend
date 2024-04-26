import { getPositionOfPersonByID } from "../../../../api/PersonAPI";

const getPositionTitleFromID = async (id: number) => {
    try {
      const position = await getPositionOfPersonByID(id);
      if (!position) return "No Position Found";
      const positionTitle = position.position_title.toString();
      return positionTitle;
    } catch (error) {
      console.error("Error fetching position from ID:", error);
      return "";
    }
};

export default getPositionTitleFromID;