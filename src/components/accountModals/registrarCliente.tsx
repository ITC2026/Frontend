import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


function ModalRegistrarCliente() {
  return (
    <Form>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2} className= "text-start">
          Nombre del Cliente
        </Form.Label>
        <Col sm={5}>
          <Form.Control type="name" placeholder="" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={2} className= "text-start">
        Descripción
        </Form.Label>
        <Col sm={5}>
          <Form.Control type="descripción" placeholder="" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
      <Form.Label column sm={2} className= "text-start">
          Contrato
        </Form.Label>
        <Col sm={{ span: 1, offset: 0 }}>
          <Button type="submit">Upload</Button>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
      <Form.Label column sm={2} className= "text-start">
          Logo
        </Form.Label>
        <Col sm={{ span: 1, offset: 0 }}>
          <Button type="submit">Upload</Button>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">

        <Col sm={{ span: 3, offset: 1 }}>
          <Form.Check label="High-Growth Client" />
        </Col>
      </Form.Group>

    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2} className= "text-start">
          División
        </Form.Label>
          <Col sm={{ span: 1, offset: 0 }}>
            <DropdownButton id="dropdown-basic-button" title="None">
            <Dropdown.Item href="#/action-1">Brazil</Dropdown.Item>
            <Dropdown.Item href="#/action-2">México</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Central & South America</Dropdown.Item>
            </DropdownButton>
          </Col>

    </Form.Group>


    </Form>
  );
}

export default ModalRegistrarCliente;