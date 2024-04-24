import Form from "react-bootstrap/Form";
import getClientNamesAndIds from "../../../utils/Clients/GetClientNamesID";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProjectInfo = () => {
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

  const formatDate = (isoDateString: string): string => {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = (1 + date.getMonth()).toString().padStart(2, "0");
    const day = (1 + date.getDate()).toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/projects/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setProjectName(data.payload.project_title);
          setProjectDescription(data.payload.project_description);
          setSelectedClientId(data.payload.client_id);
          setStartingDate(formatDate(data.payload.start_date));
          setExpirationDate(
            data.payload.has_expiration_date
              ? formatDate(data.payload.expiration_date)
              : ""
          );
          setHasExpirationDate(data.has_expiration_date);
        });
    }
  }, [
    expirationDate,
    hasExpirationDate,
    id,
    projectDescription,
    projectName,
    selectedClientId,
    startingDate,
  ]);

  const navigate = useNavigate();

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          defaultValue={projectName}
          disabled
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your description"
          defaultValue={projectDescription}
          disabled
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicClientSelect">
        <Form.Label>Cliente</Form.Label>
        <Form.Control as="select" value={selectedClientId} disabled>
          <option disabled defaultValue="">
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
        <Form.Control type="date" value={startingDate} disabled />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label="¿El proyecto tiene una fecha de expiración?"
          checked={hasExpirationDate}
          disabled
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDate">
        <Form.Label>Fecha de Expiracion</Form.Label>
        <Form.Control
          type="date"
          defaultValue={expirationDate}
          disabled={!hasExpirationDate}
        />
      </Form.Group>

      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => navigate("/account_manager/projects")}
      >
        Close
      </button>
    </Form>
  );
};

export default ProjectInfo;
