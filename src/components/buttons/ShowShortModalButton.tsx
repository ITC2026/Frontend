import "../../index.css"
import { ShortModalType } from "../modal/modalType";

interface Props {
  typeOfModalButton: ShortModalType;
  setTypeOfModal: (value: React.SetStateAction<ShortModalType>) => void;
}

const ShowShortModalButton = ({ typeOfModalButton, setTypeOfModal }: Props) => {
  return (
    <button 
      type="submit" 
      className={
        "btn btn-primary " +
        (typeOfModalButton === "delete" ? "red-encora-button" : "encora-purple-button")
      }
      onClick={() => setTypeOfModal(typeOfModalButton)}
    >
      {typeOfModalButton === "delete" ? "Eliminar" : "Finalizar"}
    </button>
  )
}

export default ShowShortModalButton;