import { getAllApplications } from "../../api/ApplicationAPI";

export const getApplicationIDFromPersonPositionID = async (
  personID: number,
  positionID: number
) => {
  const applications = await getAllApplications();
  if (!applications) {
    return;
  }
  const application = applications.find(
    (application) =>
      application.person_id === personID &&
      application.position_id === positionID
  );
  return application?.id;
};
