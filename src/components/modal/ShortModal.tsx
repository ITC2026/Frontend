import "./style/ShortModal.css";
import { ReactElement } from "react";
import { ShortModalType } from "./modalType";

interface ShortModalProps {
  content: ReactElement;
  setActiveModal: (active: boolean) => void;
  customText?: string;
}

const renderModalContent = (
  typeOfModal: ShortModalType,
  customText?: string
) => {
  switch (typeOfModal) {
    case "register":
      return (
        <>
          <h1 className="heading-form">¿Desea Continuar?</h1>
          <div className="form-group">
            {customText
              ? customText
              : "Estás a punto de modificar un elemento. Esta acción es irreversible y no se puede deshacer. ¿Estás seguro?."}
          </div>
        </>
      );
    case "modify":
      return (
        <>
          <h1 className="heading-form">¿Desea Continuar?</h1>
          <div className="form-group">
            {customText
              ? customText
              : "Estás a punto de modificar un elemento. Esta acción es irreversible y no se puede deshacer. ¿Estás seguro?"}
          </div>
        </>
      );
    case "delete":
      return (
        <>
          <h1 className="heading-form">Advertencia</h1>
          <div className="form-group">
            {customText
              ? customText
              : "Estás a punto de modificar un elemento. Esta acción es irreversible y no se puede deshacer. ¿Estás seguro?"}
          </div>
        </>
      );
    case "state":
      return (
        <Form>
          <h1 className="heading-form">¿Desea Continuar?</h1>
          <div className="form-group"></div>
        </Form>
      );
    default:
      break;
  }
};

const ShortModal = ({
  typeOfModal,
  btnArray,
  setActiveModal,
  customText,
}: ShortModalProps) => {
  return (
    <div className={`overlay background-gray`}>
      <div className="short-modal white">
        {renderModalContent(typeOfModal, customText)}
        <div className="button-wrapper">
          {btnArray && btnArray.map((btn) => btn)}
          <button
            type="submit"
            className="btn btn-primary gray-button"
            onClick={() => setActiveModal(true)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShortModal;