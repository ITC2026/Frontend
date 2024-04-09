import "./ErrorPage.css"
import ErrorLogo from "../../assets/error/encora_logo_error.png"

const ErrorPage = () => {
  return (
    <div>
      <img 
        src={ErrorLogo} 
        alt="error-image" 
        className="position-absolute top-0 end-0 z-n1"
      />
      <div className="d-flex flex-column error-message">
        <h1 className="error-title">Error 404 - Página No Encontrada</h1>
        <h2 className="error-description">La petición solicitada no fue encontrada dentro de nuestros servidores. Probablemente, la página que usted buscó no exista o ha sido movida.</h2>
        <button 
          type="submit" 
          className="btn btn-primary align-self-start encora-purple "
        >
          Ir a la Página de Inicio
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
