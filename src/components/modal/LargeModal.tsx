import "./LargeModal.css";
import "../../index.css";
import React, { useState, cloneElement } from "react";
import { ModalType, EntityFormType } from "./modalType";
import GenericFormGroup from "./GenericFormGroup";
import CheckboxFormGroup from "./CheckboxFormGroup";
import ShortModal from "./ShortModal";

interface Props {
  titleModal: string;
  btnArray?: React.ReactElement[];
  typeOfModal: ModalType;
  entityForm: EntityFormType;
  onClose: () => void;
}

const renderForm = (typeOfModal: ModalType, entityForm: EntityFormType) => {
  const { formStructure } = entityForm;
  
  switch (typeOfModal) {
    case "info":
      return Object.keys(formStructure).map((nameLabel: string) => {
        if (formStructure[nameLabel].inputType === "checkbox") {
          return <CheckboxFormGroup 
            nameLabel={nameLabel} 
            inputType={formStructure[nameLabel].inputType} 
            disableInput={true}
          />
        }
        return <GenericFormGroup 
          nameLabel={nameLabel} 
          inputType={formStructure[nameLabel].inputType} 
          disableInput={true}
        />
      });
    case "register":
      return Object.keys(formStructure).map((nameLabel: string) => {
        if (formStructure[nameLabel].inputType === "checkbox") {
          return <CheckboxFormGroup 
            nameLabel={nameLabel} 
            inputType={formStructure[nameLabel].inputType}
          />
        } else if (formStructure[nameLabel].canBeModified) {
          return <GenericFormGroup 
            nameLabel={nameLabel} 
            inputType={formStructure[nameLabel].inputType}
          />
        }
      });
    case "modify":
      return Object.keys(formStructure).map((nameLabel: string) => {
        if (formStructure[nameLabel].inputType === "checkbox") {
          return <CheckboxFormGroup 
            nameLabel={nameLabel} 
            inputType={formStructure[nameLabel].inputType}
          />
        } else if (formStructure[nameLabel].canBeModified) {
          return <GenericFormGroup 
            nameLabel={nameLabel} 
            inputType={formStructure[nameLabel].inputType}
          />
        }
      });
    default:
      break;
  }
};

const LargeModal = ({ titleModal, btnArray, typeOfModal, entityForm, onClose }: Props) => {
  const [showShortModal, setShowShortModal] = useState<boolean>(false);
  const closeShortModal = () => setShowShortModal(false);
  return (
    <div className="overlay background-gray">
      <div className="large-modal white">
        <h1 className="heading-form">{titleModal}</h1>
        <div className="form-group">{renderForm(typeOfModal, entityForm)}</div>
        <div className="button-wrapper">
          {btnArray && btnArray.map((btn: React.ReactElement) => {
            return typeof btn.type === 'function' && btn.type.name === "ShowModalButton" ? cloneElement(btn, { onClick: () => setShowShortModal(true) }) : btn;
          })}
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
      {showShortModal && <ShortModal typeOfModal={typeOfModal} onClose={closeShortModal}/>}
    </div>
  );
};

export default LargeModal;