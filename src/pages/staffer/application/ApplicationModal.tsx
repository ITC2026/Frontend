import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReturnButton } from "../../../components/ReturnButton/ReturnButton";
import {
  getApplicationById,
  modifyApplication,
} from "../../../api/ApplicationAPI";
import { Form } from "react-bootstrap";
import MediumModal from "../../../components/modal/MediumModal";
import "./ApplicationModal.css"

export const ApplicationModal = () => {
  const { id } = useParams();
  const [applicationStatus, setApplicationStatus] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    getApplicationById(Number(id)).then((application) => {
      if (!application) {
        return;
      }

      setApplicationStatus(application.application_status);
    });
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission
    modifyApplication(Number(id), {
      application_status: applicationStatus,
    }).then(() => {
      // Redirect to previous page
      navigate(-1);
    });
  };

  return (
    <div>
      <MediumModal
        content={
          <div>
            <ReturnButton />
            <h1>Actualizar aplicación</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="applicationStatus">
                <Form.Label>Estado de la aplicación</Form.Label>
                <Form.Control
                  as="select"
                  value={applicationStatus}
                  onChange={(e) => setApplicationStatus(e.target.value)}
                >
                  <option disabled value="">
                    Selecciona una opción
                  </option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Schedule for Interview">
                    Schedule For Interview
                  </option>
                  <option value="On Hold">On Hold</option>
                  <option value="Waiting on Client Response">
                    Waiting on Client Response
                  </option>
                </Form.Control>
              </Form.Group>
              <button className="application-submit-btn encora-purple-button" type="submit">
                Submit
              </button>
            </Form>
          </div>
        }
      ></MediumModal>
    </div>
  );
};
