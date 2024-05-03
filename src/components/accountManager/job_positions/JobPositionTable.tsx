import { getAllPositions } from "../../../api/PositionAPI";
import "./styles/JobPositionTable.css";
import { JobPositionStruct } from "./struct/JobPositionStruct";
import TableView from "../../table/Table";
import { useEffect, useState } from "react";
import { getProjectTitleFromJobID } from "../../../utils/JobPositions/GetProjectFromJobID";
import { useLocation } from "react-router";

const JobPositionTable = () => {
  const [jobPositions, setJobPositions] = useState<Position[]>([]);
  const location = useLocation();

  useEffect(() => {
    getAllPositions().then(async (position: Position[] | undefined) => {
      if (!position) {
        return;
      }

      const positionWithProject = await Promise.all(
        position.map(async (pos: Position) => {
          const proj_title = await getProjectTitleFromJobID(pos.id);
          return { ...pos, project_title: proj_title };
        })
      );
      const filteredPositionsWithProject = positionWithProject.filter(
        (pos) => pos.project_title
      );

      setJobPositions(filteredPositionsWithProject);
    });
  }, [location]);

  return (
    <div className="job-position-page">
      <TableView
        entity={jobPositions}
        categories={JobPositionStruct}
        hideIndex={true}
        showEdit={true}
        configBtn="Position"
      />
    </div>
  );
};

export default JobPositionTable;
