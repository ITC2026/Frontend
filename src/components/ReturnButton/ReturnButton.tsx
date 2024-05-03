import { useNavigate } from "react-router-dom";
import ArrowLeft from "../../assets/arrow-left.png";
import "./ReturnButton.css";

export const ReturnButton = () => {
  const navigate = useNavigate();

  return (
    <a onClick={() => navigate(-1)}>
      <img src={ArrowLeft} />
    </a>
  );
};
