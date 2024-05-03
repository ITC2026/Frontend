import "../style/profilePic.css";
import ProfilePicPlaceholder from "../../../../assets/profilepic_placeholder.png";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { getPersonByIdAndDates} from "../../../../api/PersonAPI";
import {  getCandidateByPersonID } from "../../../../api/CandidateAPI";
import { formatDate } from "../../../../utils/Dates";
import { getEmployeeByIdAndDates } from "../../../../api/EmployeeAPI";

const InfoBillingForm = () => {

  const [status, setStatus] = useState<string>("");
  const [profilePic, setProfilePic] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<Gender | "Ninguno">("Ninguno");
  const [title, setTitle] = useState<string>("");
  const [techStack, setTechStack] = useState<TechStack | "Ninguno">("Ninguno");
  const [division, setDivision] = useState<Division | "Ninguno">("Ninguno");
  const [region, setRegion] = useState<Region | "Ninguno">("Ninguno");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [createdDate, setCreatedDate] = useState<string>("");
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [salary, setSalary] = useState<number>(0);
  const [jobGrade, setJobGrade] = useState<string>("");
  const [proposedAction, setProposedAction] = useState<string>("");
  const [employeeStatus, setEmployeeStatus] = useState<string>("");
  const [reasonBench, setReasonBench] = useState<string>("");
  const [expectedSalary, setExpectedSalary] = useState<number>(0);
  const [personClient, setPersonClient] = useState<string>("");
  const [employeeCreatedDate, setEmployeeCreatedDate] = useState<string>("");
  const [onBenchSince, setOnBenchSince] = useState<string>("");
  const [previousClient, setPreviousClient] = useState<string>("");

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      getPersonByIdAndDates(Number(id)).then((data) => {
        if(!data) {
          return;
        }
          setName(data.name);
          setPhoneNumber(data.phone);
          setEmail(data.email);
          setTitle(data.title);
          setStatus("Billing");
          setTechStack(data.tech_stack);
          setDivision(data.division);
          setRegion(data.region);
          setGender(data.gender);
          getCandidateByPersonID(Number(id)).then((candidate) => {
            if(!candidate) {
              return;
            }
            setExpectedSalary(candidate.expected_salary);
          });
          getEmployeeByIdAndDates(Number(id)).then((employee) => {
            if(!employee) {
              return;
            }
            setSalary(employee.salary);
            setJobGrade(employee.job_grade);
            setProposedAction(employee.proposed_action);
            setEmployeeStatus(employee.employee_status);
            setReasonBench(employee.employee_reason);
            setOnBenchSince(formatDate(employee.last_movement_at.toString()));
            setEmployeeCreatedDate(formatDate(employee.createdAt.toString()));
          });

          setPersonClient(data.clients.pop()?.client_name || "N/A");
          if (data.clients.length < 1){
            setPreviousClient("N/A")
          } else {
          setPreviousClient(data.clients[length-1].client_name);
          }
          setCreatedDate(formatDate(data.created_at.toString()));
          setLastUpdate(formatDate(data.updated_at.toString()));
      });
    }
  }, [
    id,
    name,
    phoneNumber,
    email,
    title,
    status,
    techStack,
    division,
    region,
    expectedSalary,
    salary,
    jobGrade,
    proposedAction,
    employeeStatus,
    reasonBench,
    createdDate,
    lastUpdate,
    employeeCreatedDate,
    onBenchSince,
    previousClient
  ]);



  const onBenchSinceDate = onBenchSince ? new Date(onBenchSince) : null;

  const daysOnBench = onBenchSinceDate ? Math.floor((new Date().getTime() - new Date(onBenchSince).getTime()) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <Form className="form-group-person">
      <div className="top-form">
        <div className="leftside-top-form">
          <Form.Group className="mb-3 personal-image">
            <label className="label">
              <input disabled accept="image/png, image/jpeg" type="file" />
              <figure className="personal-figure">
                <img
                  src={ProfilePicPlaceholder}
                  className="disabled-personal-avatar"
                  alt="avatar"
                ></img>
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
                disabled
                type="text"
                value={name}
                bsPrefix="encora-purple-input form-control"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4 row-width-form">
            <Form.Label column sm={3} bsPrefix="label-style text-start">
              Género
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                disabled
                type="text"
                value={gender}
                bsPrefix="encora-purple-input form-control"
              ></Form.Control>
            </Col>
          </Form.Group>
        </div>
      </div>

      <div className="large-bottom-form">
        <Form.Group as={Row} className="mb-2 row-width-form">
          <Form.Label column sm={5} bsPrefix="label-style text-start">
            Título de Trabajo
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              disabled
              type="text"
              value={title}
              bsPrefix="encora-purple-input form-control"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2 row-width-form">
          <Form.Label column sm={5} bsPrefix="label-style text-start">
            Tech Stack
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              disabled
              type="text"
              value={techStack}
              bsPrefix="encora-purple-input form-control"
            ></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2 row-width-form">
          <Form.Label column sm={5} bsPrefix="label-style text-start">
            División
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              disabled
              type="text"
              value={division}
              bsPrefix="encora-purple-input form-control"
            ></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2 row-width-form">
          <Form.Label column sm={5} bsPrefix="label-style text-start">
            Región
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              disabled
              type="text"
              value={region}
              bsPrefix="encora-purple-input form-control"
            ></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2 row-width-form">
          <Form.Label column sm={5} bsPrefix="label-style text-start">
            Job Grade
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              disabled
              type="text"
              value={jobGrade}
              bsPrefix="encora-purple-input form-control"
            ></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2 row-width-form">
          <Form.Label column sm={5} bsPrefix="label-style text-start">
            Salario Esperado (MXN)
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              disabled
              type="text"
              value={expectedSalary}
              placeholder="Introduzca su salario esperado en pesos"
              bsPrefix="encora-purple-input form-control"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2 row-width-form">
          <Form.Label column sm={5} bsPrefix="label-style text-start">
            Teléfono de Contacto
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              disabled
              type="text"
              value={phoneNumber}
              placeholder="Introduzca el télefono de contacto"
              bsPrefix="encora-purple-input form-control"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2 row-width-form">
          <Form.Label column sm={5} bsPrefix="label-style text-start">
            Correo de Contacto
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              disabled
              type="text"
              value={email}
              placeholder="Introduzca su correo de contacto"
              bsPrefix="encora-purple-input form-control"
            />
          </Col>
        </Form.Group>
        
        <Form.Group as={Row} className="mb-4 row-width-form">
          <Form.Label column sm={5} bsPrefix="label-style text-start">
            Acción Propuesta
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              disabled
              type="text"
              value={proposedAction}
              bsPrefix="encora-purple-input form-control"
            ></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2 row-width-form">
          <Form.Label column sm={5} bsPrefix="label-style text-start">
            Cliente Actual
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              disabled
              type="text"
              value={personClient}
              bsPrefix="encora-purple-input form-control"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2 row-width-form">
          <Form.Label column sm={5} bsPrefix="label-style text-start">
            Cliente Anterior
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              disabled
              type="text"
              value={previousClient}
              bsPrefix="encora-purple-input form-control"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2 row-width-form">
          <Form.Label column sm={5} bsPrefix="label-style text-start">
            Empleado Desde
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              disabled
              type="text"
              value={employeeCreatedDate}
              bsPrefix="encora-purple-input form-control"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2 row-width-form">
          <Form.Label column sm={5} bsPrefix="label-style text-start">
            Billing Desde
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              disabled
              type="text"
              value={onBenchSince}
              bsPrefix="encora-purple-input form-control"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2 row-width-form">
          <Form.Label column sm={5} bsPrefix="label-style text-start">
            Días en Billing
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              disabled
              type="text"
              value={daysOnBench}
              bsPrefix="encora-purple-input form-control"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2 row-width-form">
          <Form.Label column sm={5} bsPrefix="label-style text-start">
            Id del Empleado
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              disabled
              type="text"
              value={id}
              bsPrefix="encora-purple-input form-control"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2 row-width-form">
          <Form.Label column sm={5} bsPrefix="label-style text-start">
            Creado En
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              disabled
              type="text"
              value={createdDate}
              bsPrefix="encora-purple-input form-control"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2 row-width-form">
          <Form.Label column sm={5} bsPrefix="label-style text-start">
            Última Actualización
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              disabled
              type="text"
              value={lastUpdate}
              bsPrefix="encora-purple-input form-control"
            />
          </Col>
        </Form.Group>
      </div>

      <div className="button-wrapper">
        <button
          className="btn btn-primary encora-purple-button"
          onClick={() => navigate("/resource/people")}
        >
          Finalizar
        </button>
      </div>
    </Form>
  );
};

export default InfoBillingForm;
