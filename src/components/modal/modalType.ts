export type InputType = "text" | "file" | "checkbox" | "select" | "date" | null;
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