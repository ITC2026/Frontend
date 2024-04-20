import "../../index.css"

interface Props {
  entityName: string
}

const DeleteButton = ({ entityName }: Props) => {
  return (
    <button 
      type="submit" 
      className="btn btn-primary red-encora-button" 
    >
      {`Eliminar ${entityName}`}
    </button>
  )
}

export default DeleteButton;