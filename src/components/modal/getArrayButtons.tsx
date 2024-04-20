import { LargeModalType, ShortModalType } from "./modalType";
import ShowShortModalButton from "../buttons/ShowShortModalButton";
import RegisterButton from "../buttons/RegisterButton";
import ModifyButton from "../buttons/ModifyButton";
import DeleteButton from "../buttons/DeleteButton";

export const getBtnArrLargeModal = (typeOfLargeModal: LargeModalType, setTypeOfShortModal: React.Dispatch<React.SetStateAction<ShortModalType>>) => {
  switch (typeOfLargeModal) {
    case "register":
      return [
        <ShowShortModalButton
          typeOfModalButton={"register"}
          setTypeOfModal={setTypeOfShortModal}
        />,
      ];
    case "modify":
      return [
        <ShowShortModalButton
          typeOfModalButton={"modify"}
          setTypeOfModal={setTypeOfShortModal}
        />,
        <ShowShortModalButton
          typeOfModalButton={"delete"}
          setTypeOfModal={setTypeOfShortModal}
        />,
      ];
    case "info":
    default:
      return [];
  }
};

export const getBtnArrShortModal = (entityName: string, typeOfLargeModal: ShortModalType) => {
  switch (typeOfLargeModal) {
    case "register":
      return [<RegisterButton entityName={entityName} />];
    case "modify":
      return [<ModifyButton entityName={entityName} />];
    case "delete":
      return [<DeleteButton entityName={entityName} />];
    default:
      return [];
  }
};