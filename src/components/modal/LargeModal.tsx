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
  stringArray?: string[];
}

const renderModalContent = (
  typeOfModal: LargeModalType,
  entityForm: EntityFormType,
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
              inputType={formStructure[nameLabel].inputType}
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
            content={formStructure.content.info}
          />
        );
      });
    case "register":
      return Object.keys(formStructure).map((nameLabel: string) => {
        if (formStructure[nameLabel].inputType === "checkbox") {
          return (
            <CheckboxFormGroup
              key={nameLabel}
              nameLabel={nameLabel}
              inputType={formStructure[nameLabel].inputType}
            />
          );
        } else if (formStructure[nameLabel].canBeModified) {
          return (
            <GenericFormGroup
              key={nameLabel}
              nameLabel={nameLabel}
              inputType={formStructure[nameLabel].inputType}
              content={formStructure[nameLabel].info}
            />
          );
        }
      });
    case "modify":
        return Object.keys(formStructure).map((nameLabel: string) => {
          
          if (formStructure[nameLabel].inputType === "checkbox") {
            return (
              <CheckboxFormGroup
                key={`${nameLabel}`} // Ensure unique key
                nameLabel={nameLabel}
                inputType={formStructure[nameLabel].inputType}
                disableInput={true}
                content={formStructure[nameLabel].info}
              />
            );
          }
          return (
            <GenericFormGroup
              key={`${nameLabel}`} // Ensure unique key
              nameLabel={nameLabel}
              inputType={formStructure[nameLabel].inputType}
              disableInput={false}
              content={formStructure[nameLabel].info}
            />
          );
        });
      

    default:
      break;
  }
};

const LargeModal = ({
  titleModal,
  btnArray,
  typeOfModal,
  entityForm,
  onClose,
}: Props) => {
  const modalContent = renderModalContent(typeOfModal, entityForm);

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
        </div>
      </div>
    </div>
  );
};

export default LargeModal;
