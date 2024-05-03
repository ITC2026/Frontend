import "./style/ShortModal.css";
import { ShortModalType } from "./modalType";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";

interface ShortModalProps {
  typeOfModal: ShortModalType;
  btnArray?: React.ReactElement[];
  setActiveModal?: (active: boolean) => void;
  route?: string;

  children?: React.ReactNode;
}

const renderModalContent = (
  typeOfModal: ShortModalType,
  children?: React.ReactNode
) => {
  switch (typeOfModal) {
    case "register":
      return (
        <>
          <h1 className="heading-form">¿Desea Continuar?</h1>
          <div className="form-group">
            Estás a punto de registrar un elemento. Esta acción es irreversible
            y no se puede deshacer. ¿Estás seguro?
          </div>

          {children && <div className="form-group">{children}</div>}
        </>
      );
    case "modify":
      return (
        <>
          <h1 className="heading-form">¿Desea Continuar?</h1>
          <div className="form-group">
            Estás a punto de modificar un elemento. Esta acción es irreversible
            y no se puede deshacer. ¿Estás seguro?
          </div>

          {children && <div className="form-group">{children}</div>}
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

          {children && <div className="form-group">{children}</div>}
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
  children,
  route,
}: ShortModalProps) => {
  const navigate = useNavigate();

  return (
    <div className={`overlay background-gray`}>
      <div className="short-modal white">
        {renderModalContent(typeOfModal, children)}
        <div className="button-wrapper">
          {btnArray && btnArray.map((btn) => btn)}

          {!route && (
            <button
              type="submit"
              className="btn btn-primary gray-button"
              onClick={() => setActiveModal && setActiveModal(true)}
            >
              Cancelar
            </button>
          )}

          {route && (
            <>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => navigate(route)}
              >
                Aceptar
              </button>

              <button
                className="btn btn-primary gray-button"
                onClick={() => navigate(route)}
              >
                Cancelar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShortModal;
