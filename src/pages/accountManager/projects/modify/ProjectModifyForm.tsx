import Form from "react-bootstrap/Form";
import getClientNamesAndIds from "../../../../utils/Clients/GetClientNamesID";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { modifyProject, deleteProject } from "../../../../api/ProjectAPI";
import ShortModal from "../../../../components/modal/ShortModal";
import { formatDate } from "../../../../utils/Dates";
import { getProjectById } from "../../../../api/ProjectAPI";
import "./ProjectModifyForm.css";

const ProjectModifyForm = () => {
  const [showConfirmationDelete, setShowConfirmationDelete] =
    useState<boolean>(false);
  const [showConfirmationModify, setShowConfirmationModify] =
    useState<boolean>(false);
  const [validated, setValidated] = useState(false);
  const [clients, setClients] = useState<{ id: string; name: string }[]>([]);
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [startingDate, setStartingDate] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [hasExpirationDate, setHasExpirationDate] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [closedStatus, setClosedStatus] = useState<string>("Completed");
  const [closedReason, setClosedReason] = useState<string>("");

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    getClientNamesAndIds().then((data) => setClients(data));
  }, []);

  const handleDeleteProject = () => {
    deleteProject(Number(id))
      .then(() => {
        console.log("Project deleted successfully");
        navigate("/account_manager/projects");
      })
      .catch((error) => {
        console.error("Error deleting project:", error);
      });
  };

  useEffect(() => {
    if (id) {
      getProjectById(Number(id)).then((data) => {
        if (!data) {
          return;
        }
        setProjectName(data.project_title);
        setProjectDescription(data.project_description);
        setSelectedClientId(String(data.client_id));
        setStartingDate(formatDate(String(data.start_date)));
        setHasExpirationDate(data.has_expiration_date);
        setExpirationDate(
          formatDate(String(data.expiration_date?.expiration_date))
        );
        setSelectedStatus(data.general_status);
      });
    }
  }, [id]);

  const handleModifyProject = (event: React.FormEvent<HTMLFormElement>) => {
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
      start_date: startingDate,
      has_expiration_date: hasExpirationDate,
      general_status: selectedStatus,
      closed_status: closedStatus,
      closed_reason: closedReason,
      expiration_date: expirationDate,
    };
    const id_num = Number(id);
    modifyProject(id_num, projectToSubmit)
      .then(() => {
        console.log("Project modified successfully");
        navigate("/account_manager/projects");
      })
      .catch((error) => {
        console.error("Error modifying project:", error);
      });
  };

  return (
    <Form  onSubmit={handleModifyProject} noValidate validated={validated}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
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

      <Form.Group className="mb-3" controlId="formBasicClientSelect">
        <Form.Label>Estado</Form.Label>
        <Form.Control
          as="select"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="In Preparation">In Preparation</option>
          <option value="Active">Active</option>
          <option value="Closed">Closed</option>
        </Form.Control>
      </Form.Group>

      {selectedStatus === "Closed" && (
        <div>
          <Form.Group className="mb-3" controlId="formBasicClientSelect">
            <Form.Label>Estado cerrado</Form.Label>
            <Form.Control
              as="select"
              value={closedStatus}
              onChange={(e) => setClosedStatus(e.target.value)}
            >
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Razón de cierre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your reason"
              value={closedReason}
              onChange={(e) => setClosedReason(e.target.value)}
            />
          </Form.Group>
        </div>
      )}

      <div className="action-buttons">
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => setShowConfirmationDelete(true)}
        >
          {" "}
          Eliminar Proyecto
        </button>

        <button
          type="button"
          className="btn encora-purple-button"
          onClick={() => setShowConfirmationModify(true)}
        >
          Modificar
        </button>
      </div>
      {showConfirmationModify && (
        <ShortModal
          typeOfModal="modify"
          customText = "Estás a punto de modificar un proyecto. Esta acción se puede modificar en un futuro. ¿Estás seguro?"
          btnArray={[
            <button key="modify" type="submit" className="btn encora-purple-button">
              Modificar
            </button>,
          ]}
          setActiveModal={() => setShowConfirmationModify(false)}
        />
      )}

      {showConfirmationDelete && (
        <ShortModal
          typeOfModal="delete"
          customText="Estás a punto de eliminar un proyecto. Esta acción es irreversible y no se puede deshacer. ¿Estás seguro?"
          btnArray={[
            <button
              key="delete"
              type="button"
              className="btn btn-danger"
              onClick={handleDeleteProject}
            >
              Eliminar Proyecto
            </button>,
          ]}
          setActiveModal={() => setShowConfirmationDelete(false)}
        />
      )}
    </Form>
  );
};

export default ProjectModifyForm;
