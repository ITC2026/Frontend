import "./LoginPage.css";
import LoginCard from "./LoginCard";
import Background from "../../assets/login/encora_team.jpg";

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <LoginCard />
      </div>
      <img src={Background} className="login-bg-img" alt="background" />
    </div>
  );
};

export default LoginPage;
