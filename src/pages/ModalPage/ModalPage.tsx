import "../login/LoginPage.css";
import React, { useState, useEffect } from "react";
import LargeModal from "../../components/modal/LargeModal";
import { EntityFormType, LargeModalType, ShortModalType } from "../../components/modal/modalType";
import ShowShortModalButton from "../../components/buttons/ShowShortModalButton";
import ShortModal from "../../components/modal/ShortModal";

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

const renderLargeModal = (typeOfModal: LargeModalType, closeModal: () => void, setTypeOfShortModal: (value: React.SetStateAction<ShortModalType>) => void) => {
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
      const registerButtonArray = [
        <ShowShortModalButton typeOfModalButton={"register"} setTypeOfModal={setTypeOfShortModal}/>,
      ];
      return (
        <LargeModal
          titleModal="Registrar Cliente"
          btnArray={registerButtonArray}
          typeOfModal={typeOfModal}
          entityForm={clientForm}
          onClose={closeModal}
        />
      );
    case "modify":
      const modifyButtonArray = [
        <ShowShortModalButton typeOfModalButton={"modify"} setTypeOfModal={setTypeOfShortModal} />,
        <ShowShortModalButton typeOfModalButton={"delete"} setTypeOfModal={setTypeOfShortModal} />,
      ];
      return (
        <LargeModal
          titleModal="Modificar Cliente"
          btnArray={modifyButtonArray}
          typeOfModal={typeOfModal}
          entityForm={clientForm}
          onClose={closeModal}
        />
      );
    default:
      break;
  }
};

const renderShortModal = ( typeOfModal: ShortModalType, closeModal: () => void ) => {
  switch (typeOfModal) {
    case "register":
      return <ShortModal typeOfModal={typeOfModal} onClose={closeModal} />;
    case "modify":
      return <ShortModal typeOfModal={typeOfModal} onClose={closeModal} />;
    case "delete":
      return <ShortModal typeOfModal={typeOfModal} onClose={closeModal} />;
    default:
      break;
  }
};

const ModalPage = () => {
  const [typeOfLargeModal, setTypeOfLargeModal] = useState<LargeModalType>(null);
  const [typeOfShortModal, setTypeOfShortModal] = useState<ShortModalType>(null);
  const [largeModalContent, setLargeModalContent] = useState<React.ReactNode | null>(null);
  const [shortModalContent, setShortModalContent] = useState<React.ReactNode | null>(null);

  const closeLargeModal = () => setTypeOfLargeModal(null);
  const closeShortModal = () => setTypeOfShortModal(null);

  useEffect(() => {
    setLargeModalContent(renderLargeModal(typeOfLargeModal, closeLargeModal, setTypeOfShortModal));
  }, [typeOfLargeModal]);

  useEffect(() => {
    setShortModalContent(renderShortModal(typeOfShortModal, closeShortModal));
  }, [typeOfShortModal]);

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
