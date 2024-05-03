import "../../index.css"
type ShortModalType = "register" | "modify" | "delete";

interface Props {
  typeOfModalButton: ShortModalType;
  openModal: () => void;
}

const ShowShortModalButton = ({ typeOfModalButton, openModal }: Props) => {
  return (
    <button 
      type="submit" 
      className={
        `btn btn-primary ${typeOfModalButton === "delete" ? "red-encora-button" : "encora-purple-button"}`
      }
      onClick={() => openModal()}
    >
      {typeOfModalButton === "delete" ? "Eliminar" : "Finalizar"}
    </button>
  )
}

export default ShowShortModalButton;