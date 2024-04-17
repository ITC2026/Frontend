import "../../index.css"
import { ModalType } from "../modal/modalType";

interface Props {
  typeOfModal: ModalType;
}

const FinishButton = ({ typeOfModal }: Props) => {
  return (
    <button 
      type="submit" 
      className="btn btn-primary encora-purple-button"
    >
      Finalizar
    </button>
  )
}

export default FinishButton;