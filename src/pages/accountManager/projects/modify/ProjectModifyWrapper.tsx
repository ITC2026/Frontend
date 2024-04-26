import ProjectModifyForm from "./ProjectModifyForm";
import "./ProjectModifyWrapper.css";
import { useNavigate, useLocation } from "react-router-dom";
import TableView from "../../../../components/table/Table";
import { useState, useEffect } from "react";
import { getAllPositions } from "../../../../services/positionService";

const job_position_structure = {

}

const ProjectModifyWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();

  export const TablePositions = () => {
    const [jobPositions, setJobPositions] = useState<Position[]>([]);

    useEffect(() => {
      getAllPositions().then(async (data: Position[] | undefined) => {
        if (!data) {
          return;
        }
        setJobPositions(data);
      });
    }, [location]);


  return (
    <div className="project-modify-wrapper">
      <div className="project-modify-content">
        <div className="project-modify-return">
          <button
            onClick={() => navigate("/account_manager/projects")}
            id="modify-id"
          >
            {" "}
            Regresar{" "}
          </button>
        </div>
        <ProjectModifyForm />

        <div className="table-positions">
          <TableView
            entity = {jobPositions}
            categories = {job_position_structure}
            />
        </div>
      </div>
    </div>
  );
};

export default ProjectModifyWrapper;
