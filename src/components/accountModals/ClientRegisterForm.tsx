import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

interface Props {
  onClose: (active: boolean) => void;
}

const ClientRegisterForm = (props: Props) => {
  return (
    <>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Nombre De Cliente
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            type="text"
            bsPrefix="encora-purple-input form-control"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Descripcion
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            type="text"
            bsPrefix="encora-purple-input form-control"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Contrato
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            type="file"
            bsPrefix="encora-purple-input form-control"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Logo
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            type="file"
            bsPrefix="encora-purple-input form-control"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Col sm={6}>
          <Form.Check
            type={"checkbox"}
            bsPrefix="label-style text-start form-check"
          >
            <Form.Check.Input
              type="checkbox"
              bsPrefix="encora-purple-check form-check-input"
            />
            <Form.Check.Label>High-Growth Client</Form.Check.Label>
          </Form.Check>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          División
        </Form.Label>
        <Col sm={6}>
          <Form.Select bsPrefix="encora-purple-input form-select">
            <option>None</option>
            <option>Brazil</option>
            <option>Mexico</option>
            <option>Central & South America</option>
          </Form.Select>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Date
        </Form.Label>
        <Col sm={6}>
          <input
            type="date"
            className="encora-purple-input form-control"
          ></input>
        </Col>
      </Form.Group>

      <div className="button-wrapper">
        <button
          className="btn btn-primary gray-button"
          onClick={() => props.onClose(false)}
        >
          Cerrar
        </button>
        <button
          className="btn encora-purple-button"
          onClick={() => props.onClose(false)}
        >
          Finalizar
        </button>
      </div>
    </>
  );
};

export default ClientRegisterForm;
