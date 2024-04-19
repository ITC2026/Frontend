import { useState, useEffect } from "react";
import { LargeModalType, EntityFormType } from "../components/modal/modalType";
import CheckboxFormGroup from "../components/modal/CheckboxFormGroup"
import GenericFormGroup from "../components/modal/GenericFormGroup";

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

export const useContentFromLargeModal = (typeOfModal: LargeModalType, entityForm: EntityFormType) => {
  const [disableInput, setDisableInput] = useState<Number[]>([-1]);
  const [modalContent, setModalContent] = useState<(JSX.Element | undefined)[]>([]);

  useEffect(() => {
    setModalContent(renderModalContent(typeOfModal, entityForm, setDisableInput, disableInput));
  }, [disableInput]);

  return modalContent;
};