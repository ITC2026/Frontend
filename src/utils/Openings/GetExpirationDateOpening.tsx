import { getOpeningById } from "../../api/OpeningAPI";

export const getExpirationDateOpening = async (
  id: number
): Promise<string | null> => {
  return getOpeningById(id)
    .then((opening) => {
      if (!opening) {
        return null;
      }
      if (!opening.expiration_date) {
        return null;
      }
      return opening.expiration_date.expiration_date.toString();
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
};
