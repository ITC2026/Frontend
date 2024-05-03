import { getPositionById } from "../../api/PositionAPI";

export const getJobPositionName = async (id: number): Promise<string | null> => {
  return getPositionById(id)
    .then((position) => {
      if (!position) {
        return null;
      }
      return position.position_title;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
};
