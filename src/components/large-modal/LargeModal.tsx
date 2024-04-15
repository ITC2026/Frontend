import "./LargeModal.css";
import "../../index.css"

type InputType = "text" | "btn" | "checkmark" | "dropdown" | null;
type ModalType = "Info" | "Register" | "Modify";

interface Props {
  titleModal: string;
  btnArr?: React.ReactNode[];
  typeOfModal: ModalType;
  entityAttributes: {
    Entity: string,
    Attributes: {
      [key: string]: string | null;
    },
  }
  onClose: () => void;
}

const LargeModal = ({ titleModal, btnArr, typeOfModal, entityAttributes, onClose }: Props) => {
  const { Attributes } = entityAttributes;

  const renderPropertiesInfo = () => {
    return Object.keys(Attributes).map((item) => {
      return <p key={item}>{item}</p>;
    });
  };

  const renderPropertiesRegister = () => {
    return Object.keys(Attributes).map((item, value) => {
      if (Attributes[item] !== null) {
        return <p key={item}>{item}</p>;
      }
    });
  };

  const renderPropertiesModify = () => {
    return Object.keys(Attributes).map((item, value) => {
      if (Attributes[item] !== null) {
        return <p key={item}>{item}</p>;
      }
    });
  };

  const renderProperties = () => {
    switch (typeOfModal) {
      case "Info":
        return renderPropertiesInfo();
      case "Register":
        return renderPropertiesRegister();
      case "Modify":
        return renderPropertiesModify();
      default:
        return null;
    }
  };

  return (
    <div className="overlay background-gray">
      <div className="large-modal white">
        <h1>{titleModal}</h1>
        <div>
          {renderProperties()}
        </div>
        <div className="button-wrapper">
          {btnArr && btnArr.map((btn) => btn)}
          <button 
            type="submit" 
            className={"btn btn-primary " + (typeOfModal === "Info" ? "encora-purple-button" : "gray-button")}
            onClick={() => onClose()}
          >
            {typeOfModal === "Info" ? "Finalizar" : "Cancelar"}
          </button>
        </div>
      </div>
    </div>
  )
};

export default LargeModal;