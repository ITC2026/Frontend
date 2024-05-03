import ShortModal from "../../../components/modal/ShortModal";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReturnButton } from "../../../components/ReturnButton/ReturnButton";
import {
  getApplicationById,
  modifyApplication,
} from "../../../api/ApplicationAPI";
import { Form } from "react-bootstrap";

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
      <ShortModal typeOfModal="modify" header={<ReturnButton />}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="applicationStatus">
            <Form.Label>Application Status</Form.Label>
            <Form.Control
              as="select"
              value={applicationStatus}
              onChange={(e) => setApplicationStatus(e.target.value)}
            >
              <option disabled value="">
                Select an option
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
          <button className = "application-submit-btn" type="submit">Submit</button>
        </Form>
      </ShortModal>
    </div>
  );
};
