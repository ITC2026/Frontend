import { getOpeningsWithPositionId } from "../../../../utils/Openings/GetOpeningsWithJobPosition";
import TableView from "../../../table/Table";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { OpeningStructure } from "./OpeningStructure";
import { getOpeningName } from "../../../../utils/Openings/GetOpeningName";
import { getExpirationDateOpening } from "../../../../utils/Openings/GetExpirationDateOpening";

interface Props {
  registerBtn: JSX.Element;
  registerState: boolean;
}
export const OpeningTable = (prop: Props) => {
  const [openings, setOpening] = useState<Opening[]>([]);
  const [jobTitle, setJobTitle] = useState<string>("");
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const int_id = Number(id);

  useEffect(() => {
    getOpeningsWithPositionId(int_id).then(
      async (result: Opening[] | undefined) => {
        if (!result) {
          return;
        }
        const openingsWithExpiration = await Promise.all(
          result.map(async (opening: Opening) => {
            const expiration = await getExpirationDateOpening(opening.id);
            if (!expiration) return opening;
            return { ...opening, expiration };
          })
        );
        console.log(openingsWithExpiration);
        setOpening(openingsWithExpiration);
      }
    );

    getOpeningName(int_id).then((jobPositionName) => {
      if (!jobPositionName) {
        return;
      }
      setJobTitle(jobPositionName);
    });
  }, [id, int_id, location, prop.registerState]);

  return (
    <>
      <h1> {jobTitle} </h1>
      <TableView
        entity={openings}
        categories={OpeningStructure}
        hideIndex={true}
        showEdit={true}
      >
        {prop.registerBtn}
      </TableView>
    </>
  );
};
