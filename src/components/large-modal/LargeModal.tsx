import "./LargeModal.css";
import "../../index.css";
import GenericFormGroup from "./GenericFormGroup";
import CheckboxFormGroup from "./CheckboxFormGroup";

export type InputType = "text" | "file" | "checkbox" | "dropdown" | "date" | null;
export type ModalType = "Info" | "Register" | "Modify" | null;

export interface EntityAttributesType {
  Entity: string;
  Attributes: {
    [key: string]: InputType 
  };
}

interface Props {
  titleModal: string;
  btnArr?: React.ReactNode[];
  typeOfModal: ModalType;
  entityAttributes: EntityAttributesType;
  onClose: () => void;
}

const LargeModal = ({ titleModal, btnArr, typeOfModal, entityAttributes, onClose }: Props) => {
  const { Attributes } = entityAttributes;

  const renderTypeOfForm = () => {
    switch (typeOfModal) {
      case "Info":
        return Object.keys(Attributes).map((nameAttribute: string) => {
          if (Attributes[nameAttribute] === "checkbox") {
            return <CheckboxFormGroup 
              nameAttribute={nameAttribute} 
              inputType={Attributes[nameAttribute]} 
              disableInput={true}
            />
          }
          return <GenericFormGroup 
            nameAttribute={nameAttribute} 
            inputType={Attributes[nameAttribute]} 
            disableInput={true}
          />
        });
      case "Register":
        return Object.keys(Attributes).map((nameAttribute: string) => {
          if (Attributes[nameAttribute] === "checkbox") {
            return <CheckboxFormGroup 
              nameAttribute={nameAttribute} 
              inputType={Attributes[nameAttribute]}
            />
          } else if (Attributes[nameAttribute] !== null) {
            return <GenericFormGroup 
              nameAttribute={nameAttribute} 
              inputType={Attributes[nameAttribute]}
            />
          }
        });
      case "Modify":
        return Object.keys(Attributes).map((nameAttribute: string) => {
          if (Attributes[nameAttribute] === "checkbox") {
            return <CheckboxFormGroup 
              nameAttribute={nameAttribute} 
              inputType={Attributes[nameAttribute]}
            />
          } else if (Attributes[nameAttribute] !== null) {
            return <GenericFormGroup 
              nameAttribute={nameAttribute} 
              inputType={Attributes[nameAttribute]}
            />
          }
        });
      default:
        break;
    }
  };

  return (
    <div className="overlay background-gray">
      <div className="large-modal white">
        <h1 className="heading-form">{titleModal}</h1>
        <div className="form-group">{renderTypeOfForm()}</div>
        <div className="button-wrapper">
          {btnArr && btnArr.map((btn) => btn)}
          <button
            type="submit"
            className={
              "btn btn-primary " +
              (typeOfModal === "Info" ? "encora-purple-button" : "gray-button")
            }
            onClick={() => onClose()}
          >
            {typeOfModal === "Info" ? "Finalizar" : "Cancelar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LargeModal;