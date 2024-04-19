import "../../index.css";
import "./style/LargeModal.css";
import React, { useState, useEffect } from "react";
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

const renderModalContent = (typeOfModal: LargeModalType, entityForm: EntityFormType, setDisableInput: React.Dispatch<React.SetStateAction<Number[]>>, disableInput?: Number[]) => {
  const { formStructure } = entityForm;

  switch (typeOfModal) {
    case "info":
      return Object.keys(formStructure).map((nameLabel: string) => {
        if (formStructure[nameLabel].inputType === "checkbox") {
          return <CheckboxFormGroup 
            nameLabel={nameLabel} 
            disableInput={true}
          />
        }
        return <GenericFormGroup 
          nameLabel={nameLabel} 
          disableInput={true}
          inputType={formStructure[nameLabel].inputType} 
        />
      });
    case "register":
      return Object.keys(formStructure).map((nameLabel: string, index: number) => {
        if (formStructure[nameLabel].inputType === "checkbox") {
          return <CheckboxFormGroup 
            nameLabel={nameLabel} 
            disableInput={disableInput ? disableInput.includes(index) : false}
            indexFromDisabledInput={formStructure[nameLabel].whichInputCanDisabled}
            setDisableInput={setDisableInput}
          />
        } else if (formStructure[nameLabel].canBeModified) {
          return <GenericFormGroup 
            nameLabel={nameLabel} 
            disableInput={disableInput ? disableInput.includes(index) : false}
            inputType={formStructure[nameLabel].inputType}
          />
        }
      });
    case "modify":
      return Object.keys(formStructure).map((nameLabel: string, index: number) => {
        if (formStructure[nameLabel].inputType === "checkbox") {
          return <CheckboxFormGroup 
            nameLabel={nameLabel} 
            disableInput={disableInput ? disableInput.includes(index) : false}
            indexFromDisabledInput={formStructure[nameLabel].whichInputCanDisabled}
            setDisableInput={setDisableInput}
          />
        } else if (formStructure[nameLabel].canBeModified) {
          return <GenericFormGroup 
            nameLabel={nameLabel} 
            disableInput={disableInput ? disableInput.includes(index) : false}
            inputType={formStructure[nameLabel].inputType}
          />
        }
      });
    default:
      return [];
  }
};

const LargeModal = ({ titleModal, btnArray, typeOfModal, entityForm, onClose }: Props) => {
  const [disableInput, setDisableInput] = useState<Number[]>([-1]);
  const [modalContent, setModalContent] = useState<(JSX.Element | undefined)[]>([]);

  useEffect(() => {
    setModalContent(renderModalContent(typeOfModal, entityForm, setDisableInput, disableInput));
  }, [disableInput]);

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