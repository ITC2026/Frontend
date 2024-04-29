import LargeModal from "../../../modal/LargeModal";
import ReturnButton from "../../../../assets/arrow-left.png";
import { JobPositionForm } from "./JobPositionForm";

interface Props {
  setActiveModal: (active: boolean) => void;
}

export const JobPositionModal = (prop: Props) => {
  return (
    <LargeModal
      titleModal="Registro de Posición"
      formContent={<JobPositionForm setActiveModal={prop.setActiveModal} />}
      header={
        <>
          <a className="close-modal" onClick={() => prop.setActiveModal(false)}>
            <img src={ReturnButton} id="return-button-position" />
          </a>
        </>
      }
    ></LargeModal>
  );
};
