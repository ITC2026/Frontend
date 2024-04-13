import "../login/LoginPage.css";
import LoginCard from "../login/LoginCard";
import Background from "../../assets/login/encora_team.jpg";
import LargeModal from "../../components/large-modal/LargeModal";

import FinishButton from "../../components/buttons/FinishButton";
import CancelButton from "../../components/buttons/CancelButton";


const buttonArray: React.ReactNode[] = [<FinishButton/>, <CancelButton/>];

const TestModal = () => {
  return (
    <div className="login-container">
      <LargeModal titleModal="Test" btnArr={buttonArray}/>
      <div className="login-card">
        <LoginCard />
      </div>
      <img src={Background} className="login-bg-img" alt="background" />
    </div>
  );
};

export default TestModal;
