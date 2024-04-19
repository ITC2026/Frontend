export type InputType = "text" | "file" | "checkbox" | "select" | "date" | null;
export type LargeModalType = "info" | "register" | "modify" | null;
export type ShortModalType = "register" | "modify" | "delete" | null;
export interface EntityFormType {
  entity: string;
  formStructure: {
    [key: string]: {
      inputType: InputType;
      canBeModified: boolean;
      info?: string;
      attributeName?: string; 
      selectOptions?: string[];
      whichInputCanDisabled?: number[];
    }
  };
}