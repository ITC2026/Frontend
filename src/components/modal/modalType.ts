export type InputType = "text" | "file" | "checkbox" | "select" | "date" | null;
export type LargeModalType = "info" | "register" | "modify" | null;
export type ShortModalType = "register" | "modify" | "delete" | null;
export interface EntityFormType {
  entity: string;
  formStructure: {
    [key: string]: {
      inputType: InputType;
      canBeModified: boolean;
      whichInputCanDisabled?: Number[];
    }
  };
}

export interface LargeModalProps {
  titleModal: string;
  btnArray?: React.ReactElement[];
  typeOfModal: LargeModalType;
  entityForm: EntityFormType;
  onClose: () => void;
}

export interface ShortModalProps {
  btnArray?: React.ReactElement[];
  typeOfModal: ShortModalType;
  entityForm: EntityFormType;
  onClose: () => void;
}