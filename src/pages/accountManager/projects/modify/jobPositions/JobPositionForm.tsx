import Form from "react-bootstrap/Form";
import { useState } from "react";
import "./JobPositionForm.css";
import { useParams } from "react-router-dom";

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

export const JobPositionForm = () => {
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
      project_id: 11,
    };

    console.log(
      `Submitting job position: ${JSON.stringify(jobPositionToSubmit)}`
    );
  };

  return (
    <div className="job-position-form">
      <Form onSubmit={handleSubmit}>
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
            <option value="Exclusive">Exclusive</option>
            <option value="New Head Count">New Head Count</option>
            <option value="Replacement">Replacement</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Is Cross Division</Form.Label>
          <Form.Control
            type="checkbox"
            checked={isCrossDivision}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setIsCrossDivision(e.target.checked)
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Division</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter division"
            value={division}
            onChange={(e) => setDivision(e.target.value)}
          />
        </Form.Group>
      </Form>
    </div>
  );
};
