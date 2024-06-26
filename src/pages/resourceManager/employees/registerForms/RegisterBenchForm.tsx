import "../style/profilePic.css";
import ProfilePicPlaceholder from "../../../../assets/profilepic_placeholder.png";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useState } from "react";
import {
  genderOptions,
  techStackOptions,
  divisionOptions,
  regionOptions,
  jobGradeOptions,
  proposedActionOptions,
  statusReasonOptions,
} from "../Options";
import { createPerson } from "../../../../api/PersonAPI";
import { uploadFile } from "../../../../firebase/initialize";
import { v4 as uuidv4 } from "uuid";

const peopleProfilePath = "people/profile/";

interface Props {
  setActiveModal: (active: boolean) => void;
}

const RegisterBenchForm = (props: Props) => {
  const [profilePic, setProfilePic] = useState<File>();
  const [profilePicPath, setProfilePicPath] = useState<string>();
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
  const [validated, setValidated] = useState(false);

  const general_status = "Bench";
  const salary: number = 1111;
  const employee_status = "On Hired";

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
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
    if (!profilePic || !profilePicPath) {
      console.log("Files are missing");
      return;
    }

    const urlProfilePic = await uploadFile(profilePic, profilePicPath);

    const candidateToSubmit: CreatePersonAttributes = {
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
      profile_picture: urlProfilePic,
    };
    console.log(`Submitting person: ${JSON.stringify(candidateToSubmit)}`);
    createPerson(candidateToSubmit)
      .then(() => {
        console.log("Person submitted successfully");
        props.setActiveModal(false);
      })
      .catch((error) => {
        console.error("Error submitting person:", error);
      });
  };

  return (
    <Form className="form-group-person" onSubmit={submitForm} validated={validated}>
      <div className="top-form">
        <div className="leftside-top-form">
          <Form.Group className="mb-3 personal-image">
            <label className="label">
              <input
                accept="image/png, image/jpeg"
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setProfilePic(e.target.files[0]);
                    setProfilePicPath(peopleProfilePath + uuidv4());
                  }
                }}
              />
              <figure className="personal-figure">
                <img
                  src={!profilePic ? ProfilePicPlaceholder : URL.createObjectURL(profilePic)}
                  className="personal-avatar"
                  alt="avatar"
                ></img>
                <figcaption className="personal-figcaption">
                  <i className="bi bi-pencil-fill h1"></i>
                </figcaption>
              </figure>
            </label>
          </Form.Group>
        </div>

        <div className="rightside-top-form">
          <Form.Group as={Row} className="mb-4 row-width-form">
            <Form.Label column sm={3} bsPrefix="label-style text-start">
              Nombre
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                type="text"
                placeholder="Introduzca su nombre"
                value={name}
                bsPrefix="encora-purple-input form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4 row-width-form">
            <Form.Label column sm={3} bsPrefix="label-style text-start">
              Género
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                as="select"
                value={gender}
                bsPrefix="encora-purple-input form-control"
                onChange={(e) => setGender(e.target.value as Gender)}
              >
                <option selected>Ninguno</option>
                {Object.keys(genderOptions).map((genderOption) => (
                  <option key={genderOption} value={genderOption}>
                    {genderOptions[genderOption as Gender]}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>
        </div>
      </div>

      <div className="bottom-form">
        <Form.Group as={Row} className="mb-2 row-width-form">
          <Form.Label column sm={5} bsPrefix="label-style text-start">
            Título de Trabajo
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              type="text"
              placeholder="Introduzca su Título de Trabajo"
              value={title}
              bsPrefix="encora-purple-input form-control"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2 row-width-form">
          <Form.Label column sm={5} bsPrefix="label-style text-start">
            Tech Stack
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              as="select"
              value={techStack}
              bsPrefix="encora-purple-input form-control"
              onChange={(e) => setTechStack(e.target.value as TechStack)}
            >
              <option selected>Ninguno</option>
              {techStackOptions.map((techStackOption) => (
                <option key={techStackOption} value={techStackOption}>
                  {techStackOption}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2 row-width-form">
          <Form.Label column sm={5} bsPrefix="label-style text-start">
            División
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              as="select"
              value={division}
              bsPrefix="encora-purple-input form-control"
              onChange={(e) => setDivision(e.target.value as Division)}
            >
              <option selected>Ninguno</option>
              {divisionOptions.map((divisionOption) => (
                <option key={divisionOption} value={divisionOption}>
                  {divisionOption}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2 row-width-form">
          <Form.Label column sm={5} bsPrefix="label-style text-start">
            Región
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              as="select"
              value={region}
              bsPrefix="encora-purple-input form-control"
              onChange={(e) => setRegion(e.target.value as Region)}
            >
              <option selected>Ninguno</option>
              {regionOptions.map((regionOption) => (
                <option key={regionOption} value={regionOption}>
                  {regionOption}
                </option>
              ))}
            </Form.Control>
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
            Salario Esperado (MXN)
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              type="text"
              placeholder="Introduzca su salario esperado en pesos"
              value={expectedSalary}
              bsPrefix="encora-purple-input form-control"
              onChange={(e) => setExpectedSalary(Number(e.target.value))}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2 row-width-form">
          <Form.Label column sm={5} bsPrefix="label-style text-start">
            Teléfono de Contacto
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              type="text"
              placeholder="Introduzca el télefono de contacto"
              value={phoneNumber}
              bsPrefix="encora-purple-input form-control"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2 row-width-form">
          <Form.Label column sm={5} bsPrefix="label-style text-start">
            Correo de Contacto
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              type="text"
              placeholder="Introduzca su correo de contacto"
              value={email}
              bsPrefix="encora-purple-input form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
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
      </div>

      <div className="button-wrapper">
        <button type="submit" className="btn btn-primary encora-purple-button">
          Registrar
        </button>
        <button
          className="btn btn-primary gray-button"
          onClick={() => props.setActiveModal(false)}
        >
          Cancelar
        </button>
      </div>
    </Form>
  );
};

export default RegisterBenchForm;