import { JobPositionForm } from "../../../components/accountManager/job_positions/forms/JobPositionForm";
import LargeModal from "../../../components/modal/LargeModal";
import { ReturnButton } from "../../../components/ReturnButton/ReturnButton";

const JobPositionModify = () => {
  return (
    <>
      <LargeModal
        titleModal="Registro de Posición"
        formContent={<JobPositionForm />}
        header={<ReturnButton />}
      />
    </>
  );
};

export default JobPositionModify;
