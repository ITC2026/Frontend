import "../login/LoginPage.css";
import React, { useState } from "react";
import LargeModal, { EntityAttributesType, ModalType } from "../../components/large-modal/LargeModal";
import FinishButton from "../../components/buttons/FinishButton";
import DeleteButton from "../../components/buttons/DeleteButton";

const clientProps: EntityAttributesType = {
  Entity: "Cliente",
  Attributes: {
    "Nombre de Cliente": "text",
    Descripción: "text",
    Contrato: "file",
    Logo: "file",
    "High-Growth Client": "checkbox",
    Division: "dropdown",
    "ID del Cliente": null,
    "Creado en": null,
    "Última Actualización": null,
  },
};

const buttonsModify: React.ReactNode[] = [
  <FinishButton />,
  <DeleteButton entityName={clientProps.Entity} />,
];

const renderModal = (modalType: ModalType, closeModal: () => void) => {
  switch (modalType) {
    case "Info":
      return (
        <LargeModal
          titleModal="Información de Cliente"
          typeOfModal={modalType}
          entityAttributes={clientProps}
          onClose={closeModal}
        />
      );
    case "Register":
      return (
        <LargeModal
          titleModal="Registrar Cliente"
          btnArr={[<FinishButton />]}
          typeOfModal={modalType}
          entityAttributes={clientProps}
          onClose={closeModal}
        />
      );
    case "Modify":
      return (
        <LargeModal
          titleModal="Modificar Cliente"
          btnArr={buttonsModify}
          typeOfModal={modalType}
          entityAttributes={clientProps}
          onClose={closeModal}
        />
      );
    default:
      return;
  }
};

const TestModal = () => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const closeModal = () => setModalType(null);

  return (
    <div>
      <button
        type="submit"
        className="btn btn-primary green"
        onClick={() => setModalType("Info")}
      >
        Info
      </button>
      <button
        type="submit"
        className="btn btn-primary blue"
        onClick={() => setModalType("Register")}
      >
        Registrar
      </button>
      <button
        type="submit"
        className="btn btn-primary gray"
        onClick={() => setModalType("Modify")}
      >
        Modificar
      </button>
      {modalType && renderModal(modalType, closeModal)}
    </div>
  );
};

export default TestModal;