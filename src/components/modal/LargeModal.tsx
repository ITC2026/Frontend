import "../../index.css";
import "./style/LargeModal.css";
import { LargeModalType, EntityFormType, LargeModalProps } from "./modalType.ts";
import { useDisableInput } from "../../hooks/useDisableInput.tsx"
import CheckboxFormGroup from "./CheckboxFormGroup.tsx";
import GenericFormGroup from "./GenericFormGroup.tsx";

const renderModalContent = (typeOfModal: LargeModalType, entityForm: EntityFormType, disableInput?: Number[], setDisableInput?: React.Dispatch<React.SetStateAction<Number[]>>) => {
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

const LargeModal = ({ titleModal, btnArray, typeOfModal, entityForm, onClose }: LargeModalProps) => {
  const { disableInput, setDisableInput } = useDisableInput();

  return (
    <div className="overlay background-gray">
      <div className="large-modal white">
        <h1 className="heading-form">{titleModal}</h1>
        <div className="form-group">{renderModalContent(typeOfModal, entityForm, disableInput, setDisableInput)}</div>
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