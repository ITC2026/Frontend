import Form from "react-bootstrap/Form";
import getClientNamesAndIds from "../../../../utils/Clients/GetClientNamesID";
import React, { useEffect, useState } from "react";
import { createProject } from "../../../../api/ProjectAPI";
import { useNavigate } from "react-router-dom";
import ShortModal from "../../../../components/modal/ShortModal";
import { Button } from "react-bootstrap";
// interface Props {
//   setActiveModal: (active: boolean) => void;
// }

const ProjectForm = () => {
  const [clients, setClients] = useState<{ id: string; name: string }[]>([]);
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [startingDate, setStartingDate] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [hasExpirationDate, setHasExpirationDate] = useState<boolean>(false);

  const [modifyId, setModifyId] = useState<number>(0);
  const [showConfirmationModify, setShowConfirmationModify] =
    useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    getClientNamesAndIds().then((data) => setClients(data));
  }, []);

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const projectToSubmit: CreateProjectAttributes = {
      project_title: projectName,
      project_description: projectDescription,
      client_id: parseInt(selectedClientId),
      start_date: new Date(startingDate),
      has_expiration_date: hasExpirationDate,
      expiration_date: new Date(expirationDate),
      general_status: "In Preparation",
    };

    console.log(`Submitting project: ${JSON.stringify(projectToSubmit)}`);

    createProject(projectToSubmit)
      .then((res) => {
        setShowConfirmationModify(true);
        setModifyId(res.id);
        console.log("Project submitted successfully");
      })
      .catch((error) => {
        console.error("Error submitting project:", error);
      });
  };

  return (
    <Form onSubmit={submitForm}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your description"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicClientSelect">
        <Form.Label>Cliente</Form.Label>
        <Form.Control
          as="select"
          value={selectedClientId}
          onChange={(e) => setSelectedClientId(e.target.value)}
        >
          <option disabled value="">
            Select a client
          </option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDate">
        <Form.Label>Fecha de inicio</Form.Label>
        <Form.Control
          type="date"
          value={startingDate}
          onChange={(e) => setStartingDate(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label="¿El proyecto tiene una fecha de expiración?"
          checked={hasExpirationDate}
          onChange={(e) => setHasExpirationDate(e.target.checked)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDate">
        <Form.Label>Fecha de Expiracion</Form.Label>
        <Form.Control
          type="date"
          value={expirationDate}
          disabled={!hasExpirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
        />
      </Form.Group>
      {showConfirmationModify && (
        <ShortModal
          typeOfModal="register"
          setActiveModal={() => {
            setShowConfirmationModify(false);
          }}
          customText="Estás a punto de registrar el proyecto que acabas de registrar. ¿Estás seguro de que quiere registrar dicho proyecto? "
          btnArray={[
            <button
              className=" btn encora-purple-button"
              onClick={() =>
                navigate(`/account_manager/projects/edit/${modifyId}`)
              }
            >
              Añadir Posición
            </button>,
            <button
              className=" btn red-encora-button"
              onClick={() => navigate(`/account_manager/projects/`)}
            >
              Añadir Proyecto Sin Posición
            </button>,
          ]}
        />
      )}
      <div className="action-buttons">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/account_manager/projects")}
        >
          Close
        </button>

        <button className="btn encora-purple-button">Submit</button>
      </div>
    </Form>
  );
};

export default ProjectForm;
