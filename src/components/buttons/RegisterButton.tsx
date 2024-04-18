import "../../index.css"

interface Props {
  entityName: string
}

const RegisterButton = ({ entityName }: Props) => {
  return (
    <button 
      type="submit" 
      className="btn btn-primary encora-purple-button" 
    >
      {`Registrar ${entityName}`}
    </button>
  )
}

export default RegisterButton;