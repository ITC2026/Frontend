import Form from "react-bootstrap/Form";
import { useState } from "react";
import "./JobPositionForm.css";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { createPosition } from "../../../../../api/PositionAPI";

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

interface Prop {
  onlyInfo?: boolean;
  setActiveModal: (active: boolean) => void;
}

export const JobPositionForm = (props: Prop) => {
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

  {
    /**
     TODO: Agregar todas las posibles divisiones, regiones y what not en un const para solo hacer mapping de las mismas.
      */
  }
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

    console.log(
      `Submitting job position: ${JSON.stringify(jobPositionToSubmit)}`
    );
    createPosition(jobPositionToSubmit).then(() => {
      props.setActiveModal(false);
    });
  };

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
              disabled={props.onlyInfo}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={props.onlyInfo}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Vacancies Position</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter vacancies position"
              value={vacanciesPosition}
              onChange={(e) => setVacanciesPosition(parseInt(e.target.value))}
              disabled={props.onlyInfo}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Working Hours</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter working hours"
              value={workingHours}
              onChange={(e) => setWorkingHours(parseInt(e.target.value))}
              disabled={props.onlyInfo}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Bill Rate</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter working hours"
              value={billRate}
              onChange={(e) => setBillRate(parseInt(e.target.value))}
              disabled={props.onlyInfo}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Posting Type</Form.Label>
            <Form.Control
              as="select"
              placeholder="Enter posting type"
              value={postingType}
              onChange={(e) => setPostingType(e.target.value)}
              disabled={props.onlyInfo}
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
                disabled={props.onlyInfo}
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
              disabled={props.onlyInfo}
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
              disabled={props.onlyInfo}
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
              disabled={props.onlyInfo}
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
                disabled={props.onlyInfo}
              />
            </Form.Group>
          </div>
        </div>
      </div>
      <div className="action-buttons">
        <Button className="encora-purple-button" type="submit">
          Registrar Proyecto
        </Button>
      </div>

    </Form>
  );
};
