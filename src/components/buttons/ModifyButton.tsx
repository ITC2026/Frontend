import "../../index.css"

interface Props {
  entityName: string
}

const ModifyButton = ({ entityName }: Props) => {
  return (
    <button 
      type="submit" 
      className="btn btn-primary encora-purple-button" 
    >
      {`Modificar ${entityName}`}
    </button>
  )
}

export default ModifyButton;