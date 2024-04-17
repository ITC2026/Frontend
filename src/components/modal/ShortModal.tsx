import "../../index.css";
import { ModalType } from "./modalType";

interface Props {
  typeOfModal: ModalType;
  onClose: () => void;
}

const ShortModal = ({ typeOfModal, onClose }: Props) => {
  return (
    <div className="overlay background-gray">
      <div className="large-modal white">
        <p>{typeOfModal}</p>
        <button
          type="submit"
          className="btn btn-primary gray-button"
          onClick={() => onClose()}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn btn-primary encora-purple-button"
        >
          Finalizar
        </button>
      </div>
    </div>
  );
};

export default ShortModal;