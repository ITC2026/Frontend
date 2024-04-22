import Form from "react-bootstrap/Form";
import getClientNamesAndIds from "../../../utils/Clients/GetClientNamesID";
import React, { useEffect, useState } from "react";
import { createProject } from "../../../api/ProjectAPI";
import { Project } from "../../../types";
interface Props {
  setActiveModal: (active: boolean) => void;
}

const ProjectForm = (prop: Props) => {
  const [clients, setClients] = useState<{ id: string; name: string }[]>([]);
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [startingDate, setStartingDate] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [hasExpirationDate, setHasExpirationDate] = useState<boolean>(false);

  useEffect(() => {
    getClientNamesAndIds().then((data) => setClients(data));
  }, []);

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const projectToSubmit: Project = {
      project_title: projectName,
      project_description: projectDescription,
      client_id: parseInt(selectedClientId),
      start_date: new Date(startingDate),
      has_expiration_date: hasExpirationDate,
      // To fix the has_expiration based on backend capabilities.
      // expiration_date: hasExpirationDate ? new Date(expirationDate) : undefined,
      general_status: "In Preparation",
    };
    console.log(`Submitting project: ${JSON.stringify(projectToSubmit)}`);
    createProject(projectToSubmit)
      .then(() => {
        console.log("Project submitted successfully");
        prop.setActiveModal(false);
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

      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => prop.setActiveModal(false)}
      >
        Close
      </button>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </Form>
  );
};

export default ProjectForm;
