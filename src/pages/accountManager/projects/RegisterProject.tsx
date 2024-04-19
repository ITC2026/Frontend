import LargeModal from "../../../components/modal/LargeModal";
import { useState, useEffect } from "react";
import { EntityFormType } from "../../../components/modal/modalType";
import { useNavigate } from "react-router";
import useClientNames from "../../../utils/Clients/GetClientNames";

const projectForm: EntityFormType = {
  entity: "Proyecto",
  formStructure: {
    "Nombre del Proyecto": {
      inputType: "text",
      canBeModified: true,
    },
    Descripción: {
      inputType: "text",
      canBeModified: true,
    },
    Cliente: {
      inputType: "select",
      canBeModified: true,
      selectOptions: [],
    },
    "Fecha de Apertura": {
      inputType: "date",
      canBeModified: true,
    },
    "¿El Proyecto es durante un tiempo determinado?": {
      inputType: "checkbox",
      canBeModified: true,
      whichInputCanDisabled: [5],
    },
    "Fecha de Cierre": {
      inputType: "date",
      canBeModified: true,
    },
  },
};

const RegisterProject = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const clientNames = useClientNames();

  useEffect(() => {
    projectForm.formStructure.Cliente.selectOptions = clientNames;
  }, [clientNames]);

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/account_manager/projects");
  };

  return (
    <div>
      {isModalOpen && clientNames && (
        <LargeModal
          typeOfModal="register"
          titleModal="Registrar Proyecto"
          entityForm={projectForm}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default RegisterProject;
