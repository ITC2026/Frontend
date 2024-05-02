import "./LoginPage.css";
import EncoraLogo from "../../assets/EncoraLogo";
import MicrosoftLogo from "../../assets/MicrosoftLogo";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../../firebase/initialize";
import { onAuthStateChanged } from "firebase/auth";
import {getFirestore, doc, getDoc} from "firebase/firestore";
import { app } from "../../firebase/initialize";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, OAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";


const LoginCard = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const firestore = getFirestore(app);

  const onLogin = (e: any) => {
    // Get user role.
    async function getRol(uid: any) {
      const docuref = doc(firestore, `users/${uid}`);
      const docuCifrada = await getDoc(docuref);
      console.log("User document data:", docuCifrada.data());
      const rol = docuCifrada.data()?.rol; // Add null check
      console.log(rol);
      return rol;
    }

    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          getRol(user.uid).then((rol) => {
            if (rol === "Account") {
              navigate("/account_manager");
            } else if (rol === "Resource") {
              navigate("/resource");
            } else if (rol === "Staffer") {
              navigate("/staffer");
            }
          });
        }
      });
      console.log(user);
      toast.success("¡Ha iniciado sesión exitosamente!")
    }) .catch ((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      alert("Inicio de Sesión fallido. Ingrese un correo electrónico y/o contraseña válidos.");
    });
  }

    // Signing in with Microsoft.
    const handleMicrosoftLogin = async () => {
      const provider = new OAuthProvider('microsoft.com');
      try {
        const result = await signInWithPopup(auth, provider);
        console.log("Microsoft Login Successful: ", result)
        navigate("/account_manager");
      } catch (error) {
        console.log("Error Signing in with Microsoft: ", error);
      }
    };


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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary encora-purple-button " 
          id="login-button"
          onClick={onLogin}
        >
          Login
        </button>

        <button
          type="submit"
          className="btn btn-primary"
          id="login-button-microsoft"
          onClick={handleMicrosoftLogin}
        >
          <MicrosoftLogo />
          Iniciar Sesion con Microsoft
        </button>
      </form>
    </div>
  );
};

export default LoginCard;
