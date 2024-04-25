import ShowShortModalButton from "../buttons/ShowShortModalButton";
import RegisterButton from "../buttons/RegisterButton";
import ModifyButton from "../buttons/ModifyButton";
import DeleteButton from "../buttons/DeleteButton";
import { LargeModalType } from "./modalType";
import { ShortModalType } from "./modalType";

export const getBtnArrLargeModal = (typeOfLargeModal: LargeModalType, openModal: React.Dispatch<React.SetStateAction<ShortModalType>>) => {
  switch (typeOfLargeModal) {
    case "register":
      return [
        <ShowShortModalButton
          typeOfModalButton={"register"}
          openModal={() => openModal("register")}
        />,
      ];
    case "modify":
      return [
        <ShowShortModalButton
          typeOfModalButton={"modify"}
          openModal={() => openModal("modify")}
        />,
        <ShowShortModalButton
          typeOfModalButton={"delete"}
          openModal={() => openModal("delete")}
        />,
      ];
    case "info":
    default:
      return [];
  }
};

export const getBtnArrShortModal = (typeOfShortModal: ShortModalType) => {
  switch (typeOfShortModal) {
    case "register":
      return [<RegisterButton/>];
    case "modify":
      return [<ModifyButton/>];
    case "delete":
      return [<DeleteButton/>];
    default:
      return [];
  }
};