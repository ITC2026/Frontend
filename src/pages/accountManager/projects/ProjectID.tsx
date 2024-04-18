import { useState, useEffect } from "react";
import LargeModal from "../../../components/modal/LargeModal";
import { EntityFormType } from "../../../components/modal/modalType";
import { useNavigate, useParams } from "react-router-dom";

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
      inputType: "text",
      canBeModified: true,
    },
    "Fecha de Apertura": {
      inputType: "date",
      canBeModified: true,
    },
    "¿El Proyecto es durante un tiempo determinado?": {
      inputType: "checkbox",
      canBeModified: true,
    },
    "Fecha de Cierre": {
      inputType: "date",
      canBeModified: true,
    },
  },
};

const ProjectDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/account_manager/projects");
  };

  useEffect(() => {
    console.log(id);
  }, [id]);
  
  return (
    <>
      {isModalOpen && (
        <LargeModal
          titleModal="Project Details"
          typeOfModal="register"
          entityForm={projectForm}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default ProjectDetail;
