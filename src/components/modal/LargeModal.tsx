/* eslint-disable no-case-declarations */
import "../../index.css";
import "./style/LargeModal.css";
import React, { useState } from "react";
import { LargeModalType, EntityFormType } from "./modalType";
import GenericFormGroup from "./GenericFormGroup";
import CheckboxFormGroup from "./CheckboxFormGroup";
import modelProject from "../../utils/Project/ModelProject_Func";

interface Props {
  titleModal: string;
  btnArray?: React.ReactElement[];
  typeOfModal: LargeModalType;
  entityForm: EntityFormType;
  selectOptions?: string[];
  onClose: () => void;
}



const createEntity = (formValues: { [key: string]: string }, entityForm: EntityFormType) => {
  const entityType = entityForm.entity;

  switch (entityType) {
    case "Proyecto":
      modelProject(formValues);
      break;
    default:
      break;
  }
};



const renderModalContent = (
  typeOfModal: LargeModalType,
  entityForm: EntityFormType,
  setDisableInput: React.Dispatch<React.SetStateAction<number[]>>,
  disableInput?: number[],
  handleInputChange?: (name: string, value: string | number) => void
) => {
  const { formStructure } = entityForm;

  switch (typeOfModal) {
    case "info":
      return Object.keys(formStructure).map((nameLabel: string) => {
        if (formStructure[nameLabel].inputType === "checkbox") {
          return (
            <CheckboxFormGroup
              key={nameLabel}
              nameLabel={nameLabel}
              disableInput={true}
            />
          );
        }
        return (
          <GenericFormGroup
            key={nameLabel}
            nameLabel={nameLabel}
            inputType={formStructure[nameLabel].inputType}
            disableInput={true}
            content={formStructure[nameLabel].info}
            onChange={(value: string | number) =>
              handleInputChange && handleInputChange(nameLabel, value)
            }
          />
        );
      });
    case "register":
      return Object.keys(formStructure).map(
        (nameLabel: string, index: number) => {
          if (formStructure[nameLabel].inputType === "checkbox") {
            return (
              <CheckboxFormGroup
                key={nameLabel}
                nameLabel={nameLabel}
                disableInput={
                  disableInput ? disableInput.includes(index) : false
                }
                indexFromDisabledInput={
                  formStructure[nameLabel].whichInputCanDisabled
                }
                setDisableInput={setDisableInput}
              />
            );
          } else if (formStructure[nameLabel].canBeModified) {
            return (
              <GenericFormGroup
                key={nameLabel}
                nameLabel={nameLabel}
                inputType={formStructure[nameLabel].inputType}
                disableInput={
                  disableInput ? disableInput.includes(index) : false
                }
                content={formStructure[nameLabel].info}
                selectOptions={formStructure[nameLabel].selectOptions}
                onChange={(value: string | number) =>
                  handleInputChange && handleInputChange(nameLabel, value)
                }
              />
            );
          }
        }
      );
    case "modify":
      return Object.keys(formStructure).map(
        (nameLabel: string, index: number) => {
          if (formStructure[nameLabel].inputType === "checkbox") {
            return (
              <CheckboxFormGroup
                key={nameLabel}
                nameLabel={nameLabel}
                disableInput={
                  disableInput ? disableInput.includes(index) : false
                }
                indexFromDisabledInput={
                  formStructure[nameLabel].whichInputCanDisabled
                }
                setDisableInput={setDisableInput}
              />
            );
          } else if (formStructure[nameLabel].canBeModified) {
            return (
              <GenericFormGroup
                key={nameLabel}
                nameLabel={nameLabel}
                disableInput={
                  disableInput ? disableInput.includes(index) : false
                }
                inputType={formStructure[nameLabel].inputType}
                content={formStructure[nameLabel].info}
                selectOptions={formStructure[nameLabel].selectOptions}
                onChange={(value: string | number) =>
                  handleInputChange && handleInputChange(nameLabel, value)
                }
              />
            );
          }
        }
      );
    default:
      return [];
  }
};

const LargeModal = ({
  titleModal,
  btnArray,
  typeOfModal,
  entityForm,
  onClose,
}: Props) => {
  const [disableInput, setDisableInput] = useState<number[]>([-1]);
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});

  const handleInputChange = (name: string, value: string | number) => {    
    setFormValues(prevState => ({ ...prevState, [name]: String(value) }));
  };
  


 

  const modalContent = renderModalContent(
    typeOfModal,
    entityForm,
    setDisableInput,
    disableInput,
    handleInputChange
  );

  return (
    <div className="overlay background-gray">
      <div className="large-modal white">
        <h1 className="heading-form">{titleModal}</h1>
        <div className="form-group">{modalContent}</div>
        <div className="button-wrapper">
          {btnArray && btnArray.map((btn) => btn)}
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
          {typeOfModal === "register" ? (
            <button
              type="submit"
              onClick={() => {
                createEntity(formValues, entityForm);
                onClose();
              }}
              className="btn btn-primary encora-purple-button"
            >
              Registrar
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default LargeModal;
