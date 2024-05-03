import JobPositionModifyForm from "../../../components/accountManager/job_positions/forms/modify/JobPositionModifyForm";
import LargeModal from "../../../components/modal/LargeModal";
import { ReturnButton } from "../../../components/ReturnButton/ReturnButton";

const JobPositionModify = () => {
  return (
    <>
      <LargeModal
        titleModal="Modificación de Posición"
        formContent={<JobPositionModifyForm/>}
        header={<ReturnButton />}
      />
    </>
  );
};

export default JobPositionModify;
