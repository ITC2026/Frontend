import "../../index.css";
import "./ShortModal.css";
import { EntityFormType, ShortModalType } from "./modalType";

interface Props {
  btnArray?: React.ReactElement[];
  typeOfModal: ShortModalType;
  entityForm: EntityFormType;
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

const ShortModal = ({ btnArray, typeOfModal, onClose }: Props) => {
  return (
    <div className="overlay background-gray">
      <div className="short-modal white">
        {renderModalContent(typeOfModal)}
        <div className="button-wrapper">
          {btnArray && btnArray.map((btn => btn))}
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