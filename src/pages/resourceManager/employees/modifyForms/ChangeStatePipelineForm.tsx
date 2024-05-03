import "../style/profilePic.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { uploadFile } from "../../../../firebase/initialize";
import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { modifyPerson } from "../../../../api/PersonAPI";
import { getPersonById } from "../../../../api/PersonAPI";


import {
  jobGradeOptions,
  proposedActionOptions,
  statusReasonOptions,
} from "../Options";


const ChangeStatePipelineForm = () => {

  const [profilePic] = useState<File>();
  const [profilePicPath, setProfilePicPath] = useState<string>();
  const [originalProfilePicPath, setOriginalProfilePicPath] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<Gender | "Ninguno">("Ninguno");
  const [title, setTitle] = useState<string>("");
  const [techStack, setTechStack] = useState<TechStack | "Ninguno">("Ninguno");
  const [division, setDivision] = useState<Division | "Ninguno">("Ninguno");
  const [region, setRegion] = useState<Region | "Ninguno">("Ninguno");
  const [jobGrade, setJobGrade] = useState<JobGrade | "Ninguno">("Ninguno");
  const [expectedSalary, setExpectedSalary] = useState<number>(0);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [reasonBench, setReasonBench] = useState<StatusReason | "Ninguno">("Ninguno");
  const [proposedAction, setProposedAction] = useState<ProposedAction | "Ninguno">("Ninguno");
  const [, setEmployeeStatus] = useState<string>("");
  const [,setSalary] = useState<string>("");
  const [, setStatus] = useState<string>("");
  const [movementReason, setMovementReason] = useState<string>("");

  const general_status = "Bench";
  const salary: number = 1111;
  const employee_status = "On Hired";

  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      getPersonById(Number(id)).then((data) => {
        if(!data) {
          return;
        }
        setOriginalProfilePicPath(data.profile_picture);
        setProfilePicPath(data.profile_picture);
        setName(data.name);
        setPhoneNumber(data.phone);
        setEmail(data.email);
        setTitle(data.title);
        setStatus("Bench")
        setTechStack(data.tech_stack);
        setDivision(data.division);
        setRegion(data.region);
        setGender(data.gender);
        setExpectedSalary(data.expected_salary);
        setSalary(salary.toString());
        setJobGrade(jobGrade);
        setProposedAction(proposedAction);
        setEmployeeStatus(employee_status);
        setReasonBench(reasonBench);
        setMovementReason(movementReason);
      });
    }
  },[id]);


  const handleModifyPerson = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      console.log("Form is invalid");
      setValidated(true);
      return;
    }

    setValidated(true);

    let urlProfilePic = originalProfilePicPath;

    if (originalProfilePicPath !== profilePicPath) {
      if (!profilePic || !profilePicPath) {
        console.log("Profile Pic File is missing");
        return;
      }
      urlProfilePic = await uploadFile(profilePic, profilePicPath);
    } 

    const personToSubmit: CreatePersonAttributes = {
      profile_picture: urlProfilePic,
      name: name,
      phone: phoneNumber,
      email: email,
      title: title,
      tech_stack: techStack,
      division: division,
      region: region,
      gender: gender,
      expected_salary: expectedSalary,
      status: general_status,
      salary: salary,
      job_grade: jobGrade,
      proposed_action: proposedAction,
      employee_status: employee_status,
      employee_reason: reasonBench,
      movement_reason: movementReason,
    };

    const id_num = Number(id);

    console.log(JSON.stringify(personToSubmit));

    modifyPerson(id_num, personToSubmit)
      .then(() => {
        console.log("Person submitted successfully");
        navigate("/resource/people");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error modifying person:", error);
      });

    // createEmployee(employeeToSubmit)
    //   .then(() => {
    //     console.log("Candidate submitted successfully");
    //   })
    //   .catch((error) => {
    //     console.error("Error submitting candidate:", error);
    //   });
  };

  return (
    <>
      <Form className="form-group" onSubmit={handleModifyPerson} validated={validated}>
      <div className="top-form">
        <div className="leftside-top-form">
        <Form.Group as={Row} className="mb-4 row-width-form">
          <Form.Label column sm={3} bsPrefix="label-style text-start">
            Nombre del Empleado
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              disabled
              value={name}
              type="text"
              bsPrefix="encora-purple-input form-control"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2 row-width-form">
          <Form.Label column sm={5} bsPrefix="label-style text-start">
            Job Grade
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              as="select"
              value={jobGrade}
              bsPrefix="encora-purple-input form-control"
              onChange={(e) => setJobGrade(e.target.value as JobGrade)}
            >
              <option selected>Ninguno</option>
              {jobGradeOptions.map((jobGradeOption) => (
                <option key={jobGradeOption} value={jobGradeOption}>
                  {jobGradeOption}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2 row-width-form">
          <Form.Label column sm={5} bsPrefix="label-style text-start">
            Razón de Bench
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              as="select"
              value={reasonBench}
              bsPrefix="encora-purple-input form-control"
              onChange={(e) => 
                setReasonBench(e.target.value as StatusReason)
              }
              >
              <option selected>Ninguno</option>
              {Object.keys(statusReasonOptions).map(
                (statusReasonOption) => (
                  <option
                    key={statusReasonOption}
                    value={statusReasonOption}
                  >
                    {
                      statusReasonOptions[
                        statusReasonOption as StatusReason
                      ]
                    }
                  </option>
                )
              )}
              </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-4 row-width-form">
          <Form.Label column sm={5} bsPrefix="label-style text-start">
            Acción Propuesta
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              as="select"
              value={proposedAction}
              bsPrefix="encora-purple-input form-control"
              onChange={(e) =>
                setProposedAction(e.target.value as ProposedAction)
              }
            >
              <option selected>Ninguno</option>
              {Object.keys(proposedActionOptions).map(
                (proposedActionOption) => (
                  <option
                    key={proposedActionOption}
                    value={proposedActionOption}
                  >
                    {
                      proposedActionOptions[
                        proposedActionOption as ProposedAction
                      ]
                    }
                  </option>
                )
              )}
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2 row-width-form">
          <Form.Label column sm={5} bsPrefix="label-style text-start">
              Razón de movimiento
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              type="text"
              placeholder="Introduzca una razón"
              value={movementReason}
              bsPrefix="encora-purple-input form-control"
              onChange={(e) => setMovementReason(e.target.value)}
            />
          </Col>
        </Form.Group>

        </div> 
      
        <div className="button-wrapper">
          <button
            className="btn btn-primary gray-button"
            onClick={() => navigate("/resource/people")}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="btn btn-primary encora-purple-button"
          >
            Modificar
          </button>

        </div>
        </div>
      </Form>
    </>
  );
};

export default ChangeStatePipelineForm;
