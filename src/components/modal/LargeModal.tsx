import "../../index.css";
import "./style/LargeModal.css";
import React from "react";
import { LargeModalType, EntityFormType } from "./modalType";
import { useContentFromLargeModal } from "../../hooks/useContentFromLargeModal.tsx"

interface Props {
  titleModal: string;
  btnArray?: React.ReactElement[];
  typeOfModal: LargeModalType;
  entityForm: EntityFormType;
  onClose: () => void;
}

const LargeModal = ({ titleModal, btnArray, typeOfModal, entityForm, onClose }: Props) => {
  const modalContent = useContentFromLargeModal(typeOfModal, entityForm);

  return (
    <div className="overlay background-gray">
      <div className="large-modal white">
        <h1 className="heading-form">{titleModal}</h1>
        <div className="form-group">{modalContent}</div>
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