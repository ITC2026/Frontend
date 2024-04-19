import "../login/LoginPage.css";
import { EntityFormType, LargeModalType, ShortModalType } from "../../components/modal/modalType";
import LargeModal from "../../components/modal/LargeModal";
import ShortModal from "../../components/modal/ShortModal";
import ShowShortModalButton from "../../components/buttons/ShowShortModalButton";
import RegisterButton from "../../components/buttons/RegisterButton";
import ModifyButton from "../../components/buttons/ModifyButton";
import DeleteButton from "../../components/buttons/DeleteButton";
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

const getBtnArrLargeModal = (typeOfLargeModal: LargeModalType, setTypeOfShortModal: React.Dispatch<React.SetStateAction<ShortModalType>>) => {
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

const getBtnArrShortModal = (entityName: string, typeOfLargeModal: ShortModalType) => {
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

const ModalPage = () => {
  const { shortModalProps, typeOfShortModal, setTypeOfShortModal } = useShortModal(clientForm);
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
      {typeOfLargeModal && largeModalProps && <LargeModal {...largeModalProps} btnArray={getBtnArrLargeModal(typeOfLargeModal, setTypeOfShortModal)}/>}
      {typeOfShortModal && shortModalProps && <ShortModal {...shortModalProps} btnArray={getBtnArrShortModal(clientForm.entity, typeOfShortModal)}/>}
    </div>
  );
};

export default ModalPage;