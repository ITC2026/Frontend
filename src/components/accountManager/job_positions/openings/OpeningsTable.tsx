import { getOpeningsWithPositionId } from "../../../../utils/Openings/GetOpeningsWithJobPosition";
import TableView from "../../../table/Table";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { OpeningStructure } from "./OpeningStructure";
import { getOpeningName } from "../../../../utils/Openings/GetOpeningName";

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
    getOpeningsWithPositionId(int_id).then((result) => {
      if (!result) {
        return;
      }
      setOpening(result);
     
    });

    getOpeningName(int_id).then((jobPositionName) => {
    if (!jobPositionName) {
    return;
        }
      setJobTitle(jobPositionName);
    });
  }, [id, location, prop.registerState]);

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
