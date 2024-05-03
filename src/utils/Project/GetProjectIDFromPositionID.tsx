import { getPositionById } from "../../api/PositionAPI";

export const getProjectIDFromPositionID = async (
  position_id: number
): Promise<string | null> => {
  const position = await getPositionById(position_id);
  if (!position) {
    return null;
  }
  return String(position.project_id);
};
