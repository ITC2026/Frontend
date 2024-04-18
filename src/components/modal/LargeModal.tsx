import "../../index.css";
import "./LargeModal.css";
import React from "react";
import { LargeModalType, EntityFormType } from "./modalType";
import GenericFormGroup from "./GenericFormGroup";
import CheckboxFormGroup from "./CheckboxFormGroup";

interface Props {
  titleModal: string;
  btnArray?: React.ReactElement[];
  typeOfModal: LargeModalType;
  entityForm: EntityFormType;
  onClose: () => void;
}

const renderModalContent = (typeOfModal: LargeModalType, entityForm: EntityFormType) => {
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
  return (
    <div className="overlay background-gray">
      <div className="large-modal white">
        <h1 className="heading-form">{titleModal}</h1>
        <div className="form-group">{renderModalContent(typeOfModal, entityForm)}</div>
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