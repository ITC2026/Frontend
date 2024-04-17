import "../login/LoginPage.css";
import React, { useState, useEffect } from "react";
import LargeModal from "../../components/modal/LargeModal";
import { EntityFormType, ModalType } from "../../components/modal/modalType";
import FinishButton from "../../components/buttons/FinishButton";
import DeleteButton from "../../components/buttons/DeleteButton";

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
    },
    Division: {
      inputType: "select",
      canBeModified: true,
    },
    "ID del Cliente":{
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

const buttonsModify: React.ReactNode[] = [
  <FinishButton />,
  <DeleteButton entityName={clientForm.entity} />,
];

const renderModal = (typeOfModal: ModalType, closeModal: () => void) => {
  switch (typeOfModal) {
    case "info":
      return (
        <LargeModal
          titleModal="Información de Cliente"
          typeOfModal={typeOfModal}
          entityForm={clientForm}
          onClose={closeModal}
        />
      );
    case "register":
      return (
        <LargeModal
          titleModal="Registrar Cliente"
          btnArray={[<FinishButton />]}
          typeOfModal={typeOfModal}
          entityForm={clientForm}
          onClose={closeModal}
        />
      );
    case "modify":
      return (
        <LargeModal
          titleModal="Modificar Cliente"
          btnArray={buttonsModify}
          typeOfModal={typeOfModal}
          entityForm={clientForm}
          onClose={closeModal}
        />
      );
    default:
      break;
  }
};

const ModalPage = () => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
  const closeModal = () => setModalType(null);

  useEffect(() => {
    setModalContent(renderModal(modalType, closeModal));
  }, [modalType]);

  return (
    <div>
      <button
        type="submit"
        className="btn btn-primary green"
        onClick={() => setModalType("info")}
      >
        Info
      </button>
      <button
        type="submit"
        className="btn btn-primary blue"
        onClick={() => setModalType("register")}
      >
        Registrar
      </button>
      <button
        type="submit"
        className="btn btn-primary gray"
        onClick={() => setModalType("modify")}
      >
        Modificar
      </button>
      {modalContent}
    </div>
  );
};

export default ModalPage;