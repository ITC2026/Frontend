import "../../index.css";
import "./style/ShortModal.css";
import { ShortModalType } from "./modalType";

interface ShortModalProps {
  typeOfModal: ShortModalType;
  btnArray?: React.ReactElement[];
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
          <div className="form-group">
            Estás a punto de eliminar un elemento. Esta acción es irreversible y
            no se puede deshacer. ¿Estás seguro?
          </div>
        </>
      );
    default:
      break;
  }
};

const ShortModal = ({ typeOfModal, btnArray, onClose }: ShortModalProps) => {
  return (
    <div className="overlay background-gray">
      <div className="short-modal white">
        {renderModalContent(typeOfModal)}
        <div className="button-wrapper">
          {btnArray && btnArray.map((btn) => btn)}
          <button
            type="submit"
            className="btn btn-primary gray-button"
            onClick={() => onClose()}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShortModal;
