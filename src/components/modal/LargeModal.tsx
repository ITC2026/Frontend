import "../../index.css";
import "./style/LargeModal.css";
import { LargeModalType } from "./modalType";

interface Props {
  titleModal: string;
  typeOfModal: LargeModalType;
  btnArray?: React.ReactElement[];
  formContent: React.ReactElement;
  onClose: () => void;
}

const LargeModal = ({ titleModal, typeOfModal, btnArray, formContent, onClose }: Props) => {
  return (
    <div className="overlay background-gray">
      <div className="large-modal white">
        <h1 className="heading-form">{titleModal}</h1>
        {formContent}
        <div className="button-wrapper">
          {btnArray && btnArray.map((btn => btn))}
          <button
            type="submit"
            className={
              "btn btn-primary " +
              (typeOfModal === "info" ? "encora-purple-button" : "gray-button")
            }
            onClick={() => onClose()}
          >
            {typeOfModal === "info" ? "Finalizar" : "Cancelar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LargeModal;