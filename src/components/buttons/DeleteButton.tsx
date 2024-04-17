import "../../index.css"
import { ModalType } from "../modal/modalType";

interface Props {
  entityName: string;
  typeOfModal: ModalType;
}

const DeleteButton = ({ entityName, typeOfModal }: Props) => {
  return (
    <button 
      type="submit" 
      className="btn btn-primary red-encora-button"
    >
      Eliminar {entityName}
    </button>
  )
}

export default DeleteButton;