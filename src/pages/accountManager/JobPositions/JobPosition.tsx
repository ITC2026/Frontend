import JobPositionTable from "../../../components/accountManager/job_positions/JobPositionTable";
import "./style/JobPosition.css"
const JobPositionPage = () => {
  return (
    <div>
      <h1>Posiciones de trabajo</h1>
      <div className="job-position-table">
        <JobPositionTable />
      </div>
    </div>
  );
};

export default JobPositionPage;
