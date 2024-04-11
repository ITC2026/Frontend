import "./LoginPage.css";
<<<<<<< HEAD
import EncoraLogo from "./EncoraLogo";
import MicrosoftLogo from "../../assets/login/microsoft_logo.png";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
=======
import EncoraLogo from "../../assets/EncoraLogo";
import MicrosoftLogo from "../../assets/MicrosoftLogo";
>>>>>>> 1fc3c2fc637493d5a8c563d6fd27b2c9b40b2c69

const LoginCard = () => {
  const navigate = useNavigate();

  return (
    <div className="login-view">
      <form>
        <div className="login-img">
          <div id="encora-logo">
            <EncoraLogo />
          </div>
          <h2>Iniciar sesión en tu cuenta.</h2>
          <h5 className="login-subtitle">
            ¡Bienvenido de vuelta! Por favor, inserta tus detalles.
          </h5>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Correo Electrónico
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Ingresa tu correo electronico"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Ingresa tu contraseña"
          />
        </div>
<<<<<<< HEAD
        <button
          type="submit"
          className="btn btn-primary"
=======
        
        <button 
          type="submit" 
          className="btn btn-primary encora-purple-button" 
>>>>>>> 1fc3c2fc637493d5a8c563d6fd27b2c9b40b2c69
          id="login-button"
          onClick={() => navigate("/")}
        >
          Login
        </button>

        <button
          type="submit"
          className="btn btn-primary"
          id="login-button-microsoft"
        >
          <MicrosoftLogo />
          Iniciar Sesion con Microsoft
        </button>
      </form>
    </div>
  );
};

export default LoginCard;
