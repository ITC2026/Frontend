import Form from "react-bootstrap/Form";
import getClientNamesAndIds from "../../../utils/Clients/GetClientNamesID";
import React, { useEffect, useState } from "react";
import { createProject } from "../../../api/ProjectAPI";

interface Props {
  setActiveModal: (active: boolean) => void;
}

const ProjectForm = (prop: Props) => {
  const [clients, setClients] = useState<{ id: string; name: string }[]>([]);
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [startingDate, setStartingDate] = useState<string>("");
  const [validated, setValidated] = useState(false);
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [hasExpirationDate, setHasExpirationDate] = useState<boolean>(false);

  useEffect(() => {
    getClientNamesAndIds().then((data) => setClients(data));
  }, []);

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      console.log("Form is invalid");
      setValidated(true);
      return;
    }
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
      .then(() => {
        console.log("Project submitted successfully");
        prop.setActiveModal(false);
      })
      .catch((error) => {
        console.error("Error submitting project:", error);
      });
  };

  return (
    <Form       
    className="form-group"
    onSubmit={submitForm}
    noValidate
    validated={validated}>
      <Form.Group className="mb-3" bsPrefix="label-style text-start"controlId="formBasicEmail">
        <Form.Label>Nombre</Form.Label>
        
        <Form.Control
        required
          type="text"
          placeholder="Ingresa el nombre del proyecto"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Ingresa la descripción del proyecto"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicClientSelect">
        <Form.Label>Cliente</Form.Label>
        <Form.Control
          required
          as="select"
          value={selectedClientId}
          onChange={(e) => setSelectedClientId(e.target.value)}
        >
          <option disabled value="">
            Selecciona un cliente
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
        required
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

      <div className="action-buttons">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => prop.setActiveModal(false)}
            >
              Cerrar
            </button>

            <button type="submit" className="btn encora-purple-button">
              Registar Proyecto
            </button>
      </div>

    </Form>
  );
};

export default ProjectForm;
