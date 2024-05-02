import { getPositionById } from "../../api/PositionAPI";

export const getOpeningName = async (id: number): Promise<string | null> => {
  getPositionById(id).then((position) => {
    return position?.position_title;
  }).catch((err) => {
  console.error(err);
    }
    );
  return null;
};
