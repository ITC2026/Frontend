import "../login/LoginPage.css";
import React, { useState } from 'react';
import LargeModal from "../../components/large-modal/LargeModal";
import FinishButton from "../../components/buttons/FinishButton";
import DeleteButton from "../../components/buttons/DeleteButton";

const clientProps: { 
  Entity: string,
  Attributes : {
    "Nombre de Cliente": string,
    "Descripción": string,
    "Contrato": string,
    "Logo": string,
    "High-Growth Client": string,
    "Division": string,
    "ID del Cliente": string | null,
    "Creado en": string | null,
    "Última Actualización": string | null,
  }
} = {
  Entity: "Cliente",
  Attributes : {
    "Nombre de Cliente": "text",
    "Descripción": "text",
    "Contrato": "button",
    "Logo": "button",
    "High-Growth Client": "radio",
    "Division": "dropdown",
    "ID del Cliente": null,
    "Creado en": null,
    "Última Actualización": null
  }
}

const buttonsModify: React.ReactNode[] = [<FinishButton/>, <DeleteButton entityName={clientProps.Entity}/>];

const renderModal = (modalType: string | null, closeModal: Function) => {
  switch (modalType) {
    case "Info":
      return (
        <LargeModal 
          titleModal="Información de Clientes" 
          typeOfModal={modalType}
          entityAttributes={clientProps}
          onClose={closeModal}
        />
      );
    case "Register":
      return (
        <LargeModal 
          titleModal="Registrar Clientes" 
          btnArr={[<FinishButton/>]} 
          typeOfModal={modalType}
          entityAttributes={clientProps}
          onClose={closeModal}
        />
      );
    case "Modify":
      return (
        <LargeModal 
          titleModal="Modificar Clientes" 
          btnArr={buttonsModify} 
          typeOfModal={modalType}
          entityAttributes={clientProps}
          onClose={closeModal}
        />
      );
    default:
      return;
  }
}

const TestModal = () => {
  const [modalType, setModalType] = useState<string | null>(null);
  const closeModal = () => setModalType(null);
  
  return (
    <div>
      <button 
        type="submit" 
        className="btn btn-primary green"
        onClick={() =>  setModalType('Info')}
      >
        Info
      </button>
      <button 
        type="submit" 
        className="btn btn-primary blue"
        onClick={() => setModalType('Register')}
      >
        Registrar
      </button>
      <button 
        type="submit" 
        className="btn btn-primary gray"
        onClick={() => setModalType('Modify')}
      >
        Modificar
      </button>
      {renderModal(modalType, closeModal)}
    </div>
  );
};

export default TestModal;