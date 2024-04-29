import { getAllPositions } from "../../../api/PositionAPI";
import "./styles/JobPositionTable.css";
import { JobPositionStruct } from "./struct/JobPositionStruct";
import TableView from "../../table/Table";
import { useEffect, useState } from "react";

const JobPositionTable = () => {
  const [jobPositions, setJobPositions] = useState<Position[]>([]);
  
  useEffect(() => {
    getAllPositions().then(async (position: Position[] | undefined) => {
      if (!position) {
        return;
      }
      setJobPositions(position);
    });
  }, [jobPositions]);

  return (
    <div className="job-position-page">
      <TableView
        entity={jobPositions}
        categories={JobPositionStruct}
        hideIndex={true}
      />
    </div>
  );
};

export default JobPositionTable;
