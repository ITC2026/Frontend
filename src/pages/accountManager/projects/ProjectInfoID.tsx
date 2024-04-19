/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import LargeModal from "../../../components/modal/LargeModal";
import { EntityFormType } from "../../../components/modal/modalType";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectById } from "../../../api/ProjectAPI";
import { Project } from "../../../types";

/*
 *  "project_title": "Youtube",
 * "project_description": "Broadcast Channel",
 * "start_date": "2023-03-25T22:42:40.000Z",
 * "general_status": "Active",
 * "has_expiration_date": false,
 * "client_id": 2
 */

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
      checkbox_id: 1,
    },
    "Fecha de Cierre": {
      inputType: "date",
      canBeModified: true,
      attributeName: "expiration_date",
      checkbox_id: 1,
    },
  },
};

const ProjectDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [project, setProject] = useState<Project>();
  const [infoArray] = useState<string[]>([]);
  const navigate = useNavigate();

  const { id } = useParams();

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/account_manager/projects");
  };

  useEffect(() => {
    getProjectById(Number(id)).then((data: unknown) => {
      setProject(data as Project);
    });
  }, [id]);

  useEffect(() => {
    if (!project) return;

    Object.keys(projectForm.formStructure).forEach((key) => {
      const attributeName = projectForm.formStructure[key].attributeName;
      if (!attributeName) return;
      const attributeValue = project[attributeName as keyof Project];
      projectForm.formStructure[key].info = attributeValue
        ? attributeValue.toString()
        : "";
    });
  }, [project, projectForm.formStructure]);

  return (
    <>
      {isModalOpen && (
        <LargeModal
          titleModal="Project Details"
          typeOfModal="modify"
          entityForm={projectForm}
          onClose={closeModal}
          stringArray={infoArray}
        />
      )}
    </>
  );
};

export default ProjectDetail;
