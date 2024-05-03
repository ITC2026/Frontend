import LargeModal from "../../../modal/LargeModal";
import { ReturnButtonBoolean } from "../../../ReturnButton/ReturnButtonBoolean";
import { JobPositionForm } from "./JobPositionForm";

interface Props {
  setActiveModal: (active: boolean) => void;
}
export const JobPositionModal = (prop: Props) => {
  return (
    <LargeModal
      titleModal="Registro de Posición"
      formContent={
        <JobPositionForm
          setActiveModal={() => {
            prop.setActiveModal(false);
          }}
        />
      }
      header={
        <>
          <ReturnButtonBoolean
            onClose={() => {
              prop.setActiveModal(false);
            }}
          />
        </>
      }
    ></LargeModal>
  );
};
