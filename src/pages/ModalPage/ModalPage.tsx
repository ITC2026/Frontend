import "../login/LoginPage.css";
import { EntityFormType } from "../../components/modal/modalType";
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
  },
};

const ModalPage = () => {
  const { shortModalContent, setTypeOfShortModal } = useShortModal(clientForm);
  const { largeModalContent, setTypeOfLargeModal } = useLargeModal(clientForm, setTypeOfShortModal);

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
      {largeModalContent}
      {shortModalContent}
    </div>
  );
};

export default ModalPage;
