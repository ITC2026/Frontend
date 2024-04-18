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
      Registrar
    </button>
  )
}

export default RegisterButton;