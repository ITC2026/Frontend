import { getPositionById } from "../../api/PositionAPI";

export const getOpeningsWithPositionId = async (position_id: number) => {
  return async (dispatch: any) => {
    try {
      const response = await getPositionById(position_id);
      if (!response || !dispatch) {
        return;
      }
      dispatch({
        type: "GET_OPENINGS_WITH_POSITION_ID",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
