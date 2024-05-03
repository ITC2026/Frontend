import JobPositionTable from "../../../components/accountManager/job_positions/JobPositionTable";
import "./style/JobPosition.css";
import { Outlet } from "react-router-dom";

const JobPositionPage = () => {
  return (
    <div>
      <h1 className="title">Posiciones de trabajo</h1>
      <div className="job-position-table">
        <JobPositionTable />
        <Outlet />
      </div>
    </div>
  );
};

export default JobPositionPage;
