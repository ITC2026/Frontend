import "../../index.css"

interface Props {
  entityName: string;
}

const DeleteButton = (props: Props) => {
  return (
    <button 
      type="submit" 
      className="btn btn-primary red-encora-button"
    >
      Eliminar {props.entityName}
    </button>
  )
}

export default DeleteButton;