import "../../index.css";
import "./style/ShortModal.css";
import { ShortModalType } from "./modalType";
import Form from "react-bootstrap/Form";

interface ShortModalProps {
  typeOfModal: ShortModalType;
  btnArray?: React.ReactElement[];
  setActiveModal: (active: boolean) => void;
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

const ShortModal = ({ typeOfModal, btnArray, setActiveModal }: ShortModalProps) => {
  return (
    <div className="overlay background-gray">
      <div className="short-modal white">
        {renderModalContent(typeOfModal)}
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
