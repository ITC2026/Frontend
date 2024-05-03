import JobPositionModifyForm from "../../../../../components/accountManager/job_positions/forms/modify/JobPositionModifyForm";
import LargeModal from "../../../../../components/modal/LargeModal";

export const JobPositionModal = () => {
  return (
    <LargeModal
      titleModal="Registro de Posiciones de Trabajo"
      formContent={<JobPositionModifyForm type="Register" />}
    />
  );
};
