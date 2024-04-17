import "../../index.css";
import "./ShortModal.css";
import { ShortModalType } from "./modalType";

interface Props {
  typeOfModal: ShortModalType;
  onClose: () => void;
}

const renderModalContent = (typeOfModal: ShortModalType) => {
  switch (typeOfModal) {
    case "register":
      return (
        <>
          <h1 className="heading-form">¿Desea Continuar?</h1>
          <div className="form-group"></div>
        </>
      );
    case "modify":
      return (
        <>
          <h1 className="heading-form">¿Desea Continuar?</h1>
          <div className="form-group"></div>
        </>
      );
    case "delete":
      return (
        <>
          <h1 className="heading-form">Advertencia</h1>
          <div className="form-group"></div>
        </>
      );
    default:
      break;
  }
}

const ShortModal = ({ typeOfModal, onClose }: Props) => {
  return (
    <div className="overlay background-gray">
      <div className="short-modal white">
        {renderModalContent(typeOfModal)}
        <button
            type="submit"
            className={
              "btn btn-primary gray-button"
            }
            onClick={() => onClose()}
          >
            Cancelar
          </button>
      </div>
    </div>
  );
};

export default ShortModal;