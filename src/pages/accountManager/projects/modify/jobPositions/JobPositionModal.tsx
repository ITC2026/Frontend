import LargeModal from "../../../../../components/modal/LargeModal";

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
            <i className="fas fa-times">Bruh</i>
          </a>
        </>
      }
    ></LargeModal>
  );
};
