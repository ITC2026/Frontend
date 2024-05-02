import { getOpeningsWithPositionId } from "../../../../utils/Openings/GetOpeningsWithJobPosition";
import TableView from "../../../table/Table";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { OpeningStructure } from "./OpeningStructure";

interface Props {
  registerBtn: JSX.Element;
  registerState: boolean;
}
export const OpeningTable = (prop: Props) => {
  const [openings, setOpening] = useState<Opening[]>([]);
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    getOpeningsWithPositionId(Number(id)).then((result) => {
      if (!result) {
        return;
      }
      setOpening(result);
    });
  }, [id, location, prop.registerState]);

  return (
    <>
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
