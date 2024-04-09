import EncoraLogo from "./EncoraLogo";
import MicrosoftLogo from "../../assets/login/microsoft_logo.png";
import "./LoginPage.css";

const LoginCard = () => {
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
        <button type="submit" className="btn btn-primary" id="login-button">
          Submit
        </button>

        <button
          type="submit"
          className="btn btn-primary"
          id="login-button-microsoft"
        >
          <img
            src={MicrosoftLogo}
            alt="Microsoft Logo"
            className="microsoft-logo"
          />
          Iniciar Sesion con Microsoft
        </button>
      </form>
    </div>
  );
};

export default LoginCard;
