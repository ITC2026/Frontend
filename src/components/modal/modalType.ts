export type InputType = "text" | "file" | "checkbox" | "dropdown" | "date" | null;
export type ModalType = "info" | "register" | "modify" | null;
export interface EntityFormType {
  entity: string;
  formStructure: {
    [key: string]: {
      inputType: InputType;
      canBeModified: boolean
    }
  };
}