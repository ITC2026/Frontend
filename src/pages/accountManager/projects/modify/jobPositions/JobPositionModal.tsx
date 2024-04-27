import LargeModal from "../../../../../components/modal/LargeModal";
import ReturnButton from "../../../../../assets/arrow-left.png";

interface Props {
  formContent: JSX.Element;
  setActiveModal: (active: boolean) => void;
}

export const JobPositionModal = (prop: Props) => {
  return (
    <LargeModal
      titleModal="Registro de Posición"
      formContent={prop.formContent}
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
