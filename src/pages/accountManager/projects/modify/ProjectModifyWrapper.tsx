import ProjectModifyForm from "./ProjectModifyForm";
import "./ProjectModifyWrapper.css";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import TableView from "../../../../components/table/Table";
import { useState, useEffect } from "react";
import { getPositionsByProject } from "../../../../utils/Project/GetPositionFromProject";
import { JobPositionModal } from "./jobPositions/JobPositionModal";
import { JobPositionForm } from "./jobPositions/JobPositionForm";
import { Container, Row, Col } from "react-bootstrap";
import ArrowLeft from "../../../../assets/arrow-left.png"
/**
 * 
 Job Position Request Example
 * {
  "position_title": "Software Engineer",
  "comment": "No comment",
  "vacancies_position": 5,
  "working_hours": 50,
  "posting_type": "New Head Count",
  "is_cross_division": false,
  "division": "USA",
  "region": "HMO",
  "tech_stack": "Javascript",
  "is_exclusive": false,
  "bill_rate": 500,
  "project_id": 11
}
 */
const job_position_structure = {
  id: "ID",
  position_title: "Posicion",
  division: "Division",
  region: "Region",
  tech_stack: "Tecnologia",
  posting_type: "Tipo de publicacion",
};

const ProjectModifyWrapper = () => {
  const [jobPositions, setJobPositions] = useState<Position[]>([]);
  const [showRegisterPositions, setShowRegisterPositions] =
    useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams();
  useEffect(() => {
    getPositionsByProject(Number(id)).then((positions) => {
      setJobPositions(positions);
    });
  }, [location, id, jobPositions.length]);

  return (
    <Container className="project-modify-wrapper">
      <Row className="project-modify-content">
        <Col>
          <div className="project-modify-return">
            
            <a
              onClick={() => navigate("/account_manager/projects")}
              id="modify-id"
            >
              <img src = {ArrowLeft} key = "arrow-left" /> 

            </a>
            <h1> Modificar Proyecto </h1>
          </div>
          <ProjectModifyForm />

          <h2 className = "table-position-subtitle"> Posiciones del Proyecto </h2>
          <div className="table-positions">
            <TableView
              entity={jobPositions}
              categories={job_position_structure}
              hideIndex={true}
            >
              <button
                className="project-register encora-purple-button text-light"
                onClick={() => setShowRegisterPositions(true)}
              >
                Agregar posición.
              </button>
            </TableView>

            {showRegisterPositions && (
              <JobPositionModal
                formContent={<JobPositionForm />}
                setActiveModal={setShowRegisterPositions}
              />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectModifyWrapper;
