import { getPositionById } from "../../api/PositionAPI";

export const getOpeningsWithPositionId = async (position_id: number) => {
  try {
    const position = await getPositionById(position_id);
    if (!position) {
      return;
    }
    return position.openings;
  } catch (error) {
    console.log(error);
  }
};
