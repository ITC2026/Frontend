import "../login/LoginPage.css";
import { EntityFormType, LargeModalType, ShortModalType } from "../../components/modal/modalType";
import LargeModal from "../../components/modal/LargeModal";
import ShowShortModalButton from "../../components/buttons/ShowShortModalButton";
import { useLargeModal } from "../../hooks/useLargeModal";
import { useShortModal } from "../../hooks/useShortModal";

const clientForm: EntityFormType = {
  entity: "Cliente",
  formStructure: {
    "Nombre de Cliente": {
      inputType: "text",
      canBeModified: true,
    },
    Descripción: {
      inputType: "text",
      canBeModified: true,
    },
    Contrato: {
      inputType: "file",
      canBeModified: true,
    },
    Logo: {
      inputType: "file",
      canBeModified: true,
    },
    "High-Growth Client": {
      inputType: "checkbox",
      canBeModified: true,
      whichInputCanDisabled: [1, 3],
    },
    Division: {
      inputType: "select",
      canBeModified: true,
    },
    "ID del Cliente": {
      inputType: "text",
      canBeModified: false,
    },
    "Creado en": {
      inputType: "date",
      canBeModified: false,
    },
    "Última Actualización": {
      inputType: "date",
      canBeModified: false,
    },
  }
};

const getButtonArray = (typeOfLargeModal: LargeModalType, setTypeOfShortModal: React.Dispatch<React.SetStateAction<ShortModalType>>) => {
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

const ModalPage = () => {
  const { shortModalContent, setTypeOfShortModal } = useShortModal(clientForm);
  const { largeModalProps, typeOfLargeModal, setTypeOfLargeModal } = useLargeModal(clientForm);

  return (
    <div>
      <button
        type="submit"
        className="btn btn-primary green"
        onClick={() => setTypeOfLargeModal("info")}
      >
        Info
      </button>
      <button
        type="submit"
        className="btn btn-primary blue"
        onClick={() => setTypeOfLargeModal("register")}
      >
        Registrar
      </button>
      <button
        type="submit"
        className="btn btn-primary gray"
        onClick={() => setTypeOfLargeModal("modify")}
      >
        Modificar
      </button>
      {typeOfLargeModal && largeModalProps && <LargeModal {...largeModalProps} btnArray={getButtonArray(typeOfLargeModal, setTypeOfShortModal)}/>}
      {shortModalContent}
    </div>
  );
};

export default ModalPage;