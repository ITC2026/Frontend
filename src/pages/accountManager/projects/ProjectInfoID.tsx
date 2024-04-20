/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import LargeModal from "../../../components/modal/LargeModal";
import { EntityFormType } from "../../../components/modal/modalType";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectById } from "../../../api/ProjectAPI";
import { Project } from "../../../types";

const projectForm: EntityFormType = {
  entity: "Proyecto",
  formStructure: {
    "Nombre del Proyecto": {
      inputType: "text",
      canBeModified: true,
      attributeName: "project_title",

    },
    Descripción: {
      inputType: "text",
      canBeModified: true,
      attributeName: "project_description",
    },
    Cliente: {
      inputType: "text",
      canBeModified: true,
      attributeName: "client_name",
    },
    "Fecha de Apertura": {
      inputType: "date",
      canBeModified: true,
      attributeName: "start_date",
    },
    "¿El Proyecto es durante un tiempo determinado?": {
      inputType: "checkbox",
      canBeModified: true,
      attributeName: "has_expiration_date",
      whichInputCanDisabled: [5],
    },
    "Fecha de Cierre": {
      inputType: "date",
      canBeModified: true,
      attributeName: "expiration",
    },
  },
};

const ProjectDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [projectFormState, setProjectFormState] = useState(projectForm);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [, setProject] = useState<Project>();
  const navigate = useNavigate();

  const { id } = useParams();

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/account_manager/projects");
  };


useEffect(() => {
  getProjectById(Number(id)).then((data: unknown) => {
    const projectData = data as Project;
    setProject(projectData);
    if (!projectData) return;
    const newProjectForm = { ...projectFormState };
    Object.keys(newProjectForm.formStructure).forEach((key) => {
      const attributeName = newProjectForm.formStructure[key].attributeName;
      if (!attributeName) return;
      const attributeValue = projectData[attributeName as keyof Project];
      newProjectForm.formStructure[key].info = attributeValue
        ? attributeValue.toString()
        : "";
    });
    
    setProjectFormState(newProjectForm);
    setIsDataFetched(true);
  });
}, [id, projectFormState]);

  return (
    <>
      {isModalOpen && isDataFetched && (
        <LargeModal
          titleModal="Project Details"
          typeOfModal="modify"
          entityForm={projectFormState}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default ProjectDetail;
