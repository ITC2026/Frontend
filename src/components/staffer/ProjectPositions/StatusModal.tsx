import {
  getApplicationById,
  modifyApplication,
} from "../../../api/ApplicationAPI";
import ShortModal from "../../modal/ShortModal";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Form } from "react-bootstrap";
import { getProjectById } from "../../../api/ProjectAPI";
import { getPositionById } from "../../../api/PositionAPI";
import { getProjectIDFromPositionID } from "../../../utils/Project/GetProjectIDFromPositionID";

const ApplicationStatusModal = () => {
  const [application, setApplication] = useState<Application | null>(null);
  const [appId, setAppId] = useState<number>(0);
  const [position_id, setPositionId] = useState<number>(0);
  const [person_id, setPersonId] = useState<number>(0);
  const [projectId, setProjectId] = useState<string>("");

  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedStatus, setSelectedStatus] = useState<string>("");

  useEffect(() => {
    getApplicationById(Number(id)).then((application) => {
      if (!application) {
        return;
      }
      setApplication(application);
      setSelectedStatus(application.application_status);
      setPositionId(application.position_id);
      setPersonId(application.person_id);
      setAppId(application.id);

      getProjectIDFromPositionID(application.position_id).then((projectId) => {
        if (!projectId) {
          return;
        }
        console.log(`Project ID: ${projectId}`);
        setProjectId(projectId);
      });
    });
  }, [id]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission page reload
    if (!application) {
      console.error("No application loaded");
      return;
    }

    console.log(
      `Modifying application ID: ${appId} with new status: ${selectedStatus}`
    );

    modifyApplication(appId, {
      application_status: selectedStatus as ApplicationStatus,
    })
      .then(() => {
        console.log(
          "Modification successful, navigating to project positions page"
        );
        navigate(`/staffer/projects/positions/${projectId}`);
      })
      .catch((error) => {
        console.error("Error modifying application:", error);
      });
  };

  return (
    <ShortModal
      typeOfModal="modify"
      route={`/staffer/projects/positions/${projectId} `}
    >
      <Form onSubmit={handleSubmit}>
        <label htmlFor="status">Select Status:</label>
        <select
          id="status"
          value={selectedStatus}
          onChange={handleStatusChange}
        >
          <option value="Accepted">Accepted</option>
          <option value="Schedule For Interview">Schedule For Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Waiting on Client Response">
            Waiting on Client Response
          </option>
          <option value="On Hold">On Hold</option>
        </select>

        <button type="submit">Submit</button>
      </Form>
    </ShortModal>
  );
};

export default ApplicationStatusModal;
