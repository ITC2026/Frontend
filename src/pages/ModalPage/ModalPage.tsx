import "../login/LoginPage.css";
import React, { useState, useEffect } from "react";
import LargeModal from "../../components/modal/LargeModal";
import { EntityFormType, ModalType } from "../../components/modal/modalType";
import ShowModalButton from "../../components/buttons/ShowModalButton";

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

const registerButtonArray = [<ShowModalButton typeOfModalButton={"register"}/>];
const modifyButtonArray = [<ShowModalButton typeOfModalButton={"modify"}/>, <ShowModalButton typeOfModalButton={"delete"}/>];

const renderLargeModal = (typeOfModal: ModalType, closeLargeModal: () => void) => {
  switch (typeOfModal) {
    case "info":
      return (
        <LargeModal
          titleModal="Información de Cliente"
          typeOfModal={typeOfModal}
          entityForm={clientForm}
          onClose={closeLargeModal}
        />
      );
    case "register":
      return (
        <LargeModal
          titleModal="Registrar Cliente"
          btnArray={registerButtonArray}
          typeOfModal={typeOfModal}
          entityForm={clientForm}
          onClose={closeLargeModal}
        />
      );
    case "modify":
      return (
        <LargeModal
          titleModal="Modificar Cliente"
          btnArray={modifyButtonArray}
          typeOfModal={typeOfModal}
          entityForm={clientForm}
          onClose={closeLargeModal}
        />
      );
    default:
      break;
  }
};

const ModalPage = () => {
  const [typeOfModal, setTypeOfModal] = useState<ModalType>(null);
  const [largeModalContent, setLargeModalContent] = useState<React.ReactNode | null>(null);
  const closeLargeModal = () => setTypeOfModal(null);

  useEffect(() => {
    setLargeModalContent(renderLargeModal(typeOfModal, closeLargeModal));
  }, [typeOfModal]);

  return (
    <div>
      <button
        type="submit"
        className="btn btn-primary green"
        onClick={() => setTypeOfModal("info")}
      >
        Info
      </button>
      <button
        type="submit"
        className="btn btn-primary blue"
        onClick={() => setTypeOfModal("register")}
      >
        Registrar
      </button>
      <button
        type="submit"
        className="btn btn-primary gray"
        onClick={() => setTypeOfModal("modify")}
      >
        Modificar
      </button>
      {largeModalContent}
    </div>
  );
};

export default ModalPage;