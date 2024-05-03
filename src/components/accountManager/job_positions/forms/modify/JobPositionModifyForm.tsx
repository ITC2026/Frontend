import "./JobPositionModifyForm.css";
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  modifyPosition,
  getPositionById,
} from "../../../../../api/PositionAPI";

const JobPositionModifyForm = () => {
  const [positionTitle, setPositionTitle] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [vacanciesPosition, setVacanciesPosition] = useState<number>(0);
  const [workingHours, setWorkingHours] = useState<number>(0);
  const [postingType, setPostingType] = useState<string>("");
  const [isCrossDivision, setIsCrossDivision] = useState<boolean>(false);
  const [division, setDivision] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [techStack, setTechStack] = useState<string>("");
  const [isExclusive, setIsExclusive] = useState<boolean>(false);
  const [billRate, setBillRate] = useState<number>(0);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const jobPositionToSubmit: CreatePositionAttributes = {
      position_title: positionTitle,
      comment: comment,
      vacancies_position: vacanciesPosition,
      working_hours: workingHours,
      posting_type: postingType,
      is_cross_division: isCrossDivision,
      division: division,
      region: region,
      tech_stack: techStack,
      is_exclusive: isExclusive,
      bill_rate: billRate,
      project_id: id,
    };

    modifyPosition(Number(id), jobPositionToSubmit).then(() => {
      navigate("account_manager/job_positions");
    });
  };

  useEffect(() => {
    console.log("ID", id)
    if (id) {
      getPositionById(Number(id)).then((data) => {
        if (!data) {
          return;
        }

        setPositionTitle(data.position_title);
        setWorkingHours(data.working_hours);
        setPostingType(data.posting_type);
        setIsCrossDivision(data.is_cross_division);
        setDivision(data.division);
        setRegion(data.region);
        setTechStack(data.tech_stack);
        setIsExclusive(data.is_exclusive);
        setBillRate(data.bill_rate);
      });
    }
  }, [id]);


  return (
    <Form onSubmit={handleSubmit}>
      <div className="job-position-form">
        <div className="job-position-form-first-half">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Position Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter position title"
              value={positionTitle}
              onChange={(e) => setPositionTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Vacancies Position</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter vacancies position"
              value={vacanciesPosition}
              onChange={(e) => setVacanciesPosition(parseInt(e.target.value))}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Working Hours</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter working hours"
              value={workingHours}
              onChange={(e) => setWorkingHours(parseInt(e.target.value))}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Bill Rate</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter working hours"
              value={billRate}
              onChange={(e) => setBillRate(parseInt(e.target.value))}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Posting Type</Form.Label>
            <Form.Control
              as="select"
              placeholder="Enter posting type"
              value={postingType}
              onChange={(e) => setPostingType(e.target.value)}
            >
              <option disabled value="">
                Select a posting type
              </option>
              <option value="New Head Count">New Head Count</option>
              <option value="Back-fill Replacement">Replacement</option>
            </Form.Control>
          </Form.Group>

          <div className="checkbox-form">
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Label>Is Cross Division</Form.Label>
              <Form.Check
                type="checkbox"
                checked={isCrossDivision}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setIsCrossDivision(e.target.checked)
                }
              />
            </Form.Group>
          </div>
        </div>

        <div className="job-position-form-second-half">
          {/**
           * TODO: Agregar todas las demás divisiones y regiones que vayamos a utilizar. ¡Gracias!
           */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Division</Form.Label>
            <Form.Control
              as="select"
              placeholder="Enter posting type"
              value={division}
              onChange={(e) => setDivision(e.target.value)}
            >
              <option disabled value="">
                Select your division
              </option>
              <option value="USA">USA</option>
              <option value="MEXICO">MEXICO</option>
              <option value="BRAZIL">BRAZIL</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Region</Form.Label>
            <Form.Control
              as="select"
              placeholder="Enter posting type"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option disabled value="">
                Select your region
              </option>
              <option value="HMO">HMO</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Tech Stack</Form.Label>
            <Form.Control
              as="select"
              placeholder="Enter posting type"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
            >
              <option disabled value="">
                Select your Tech Stack
              </option>
              <option value="Javascript">Javascript</option>
            </Form.Control>
          </Form.Group>

          <div className="checkbox-form">
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Label>Is Exclusive?</Form.Label>
              <Form.Check
                type="checkbox"
                checked={isExclusive}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setIsExclusive(e.target.checked)
                }
              />
            </Form.Group>
          </div>
        </div>
      </div>
      <Button className="encora-purple-button" type="submit">
        Registrar proyecto
      </Button>
    </Form>
  );
};

export default JobPositionModifyForm;