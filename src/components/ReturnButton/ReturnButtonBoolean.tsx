import "./ReturnButton.css";
import ArrowLeft from "../../assets/arrow-left.png";

interface Props {
  onClose: (active: boolean) => void;
}

export const ReturnButtonBoolean = (prop: Props) => {
  return (
    <a onClick={() => prop.onClose(false)}>
      <img src={ArrowLeft} />
    </a>
  );
};
