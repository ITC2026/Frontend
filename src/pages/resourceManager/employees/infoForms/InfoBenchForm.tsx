import "../style/profilePic.css";
import ProfilePicPlaceholder from "../../../../assets/profilepic_placeholder.png";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import {
  genderOptions,
  techStackOptions,
  divisionOptions,
  regionOptions,
  jobGradeOptions,
  proposedActionOptions,
} from "../Options";

interface Props {
  setActiveModal: (active: boolean) => void;
}

const InfoBenchForm = (props: Props) => {
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
                placeholder="Introduzca su nombre"
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
                as="select"
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
              placeholder="Introduzca su Título de Trabajo"
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
              as="select"
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
              as="select"
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
              as="select"
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
              as="select"
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
              placeholder="Introduzca su correo de contacto"
              bsPrefix="encora-purple-input form-control"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2 row-width-form">
          <Form.Label column sm={5} bsPrefix="label-style text-start">
            Razón de Bench
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              disabled
              type="text"
              placeholder="Introduzca su razón de bench"
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
              as="select"
              bsPrefix="encora-purple-input form-control"
            ></Form.Control>
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
              type="date"
              bsPrefix="encora-purple-input form-control"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2 row-width-form">
          <Form.Label column sm={5} bsPrefix="label-style text-start">
            Bench Desde
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              disabled
              type="date"
              bsPrefix="encora-purple-input form-control"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2 row-width-form">
          <Form.Label column sm={5} bsPrefix="label-style text-start">
            Días en Bench
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              disabled
              type="text"
              bsPrefix="encora-purple-input form-control"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2 row-width-form">
          <Form.Label column sm={5} bsPrefix="label-style text-start">
            Inicio del Contrato
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              disabled
              type="text"
              placeholder="N/A"
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
              type="date"
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
              type="date"
              bsPrefix="encora-purple-input form-control"
            />
          </Col>
        </Form.Group>
      </div>

      <div className="button-wrapper">
        <button
          className="btn btn-primary encora-purple-button"
          onClick={() => props.setActiveModal(false)}
        >
          Finalizar
        </button>
      </div>
    </Form>
  );
};

export default InfoBenchForm;
