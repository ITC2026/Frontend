import "../style/profilePic.css";
import ProfilePicPlaceholder from "../../../../assets/profilepic_placeholder.png";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { getPersonByIdAndDates} from "../../../../api/PersonAPI";
import { getCandidateByPersonID } from "../../../../api/CandidateAPI";
import { formatDate } from "../../../../utils/Dates";

const InfoPipelineForm = () => {

  const [status, setStatus] = useState<string>("");
  const [profilePic, setProfilePic] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<Gender | "Ninguno">("Ninguno");
  const [title, setTitle] = useState<string>("");
  const [techStack, setTechStack] = useState<TechStack | "Ninguno">("Ninguno");
  const [division, setDivision] = useState<Division | "Ninguno">("Ninguno");
  const [region, setRegion] = useState<Region | "Ninguno">("Ninguno");
  const [expectedSalary, setExpectedSalary] = useState<number>(0);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [createdDate, setCreatedDate] = useState<string>("");
  const [lastUpdate, setLastUpdate] = useState<string>("");

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
          setStatus("Pipeline");
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
          console.log(data.created_at);
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
    createdDate,
    lastUpdate,
  ]);

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

      <div className="bottom-form">
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
            Salario Esperado (MXN)
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              disabled
              type="text"
              value={expectedSalary}
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

export default InfoPipelineForm;
