import "../../index.css"
import { ActionsButtonType } from "../modal/modalType";

interface Props {
  typeOfModalButton: ActionsButtonType;
  onClick?: () => void;
}

const ShowModalButton = ({ typeOfModalButton, onClick }: Props) => {
  return (
    <button 
      type="submit" 
      className={
        "btn btn-primary " +
        (typeOfModalButton === "delete" ? "red-encora-button" : "encora-purple-button")
      }
      onClick={onClick}
    >
      {typeOfModalButton === "delete" ? "Eliminar" : "Finalizar"}
    </button>
  )
}

export default ShowModalButton;