import "../../index.css";
import "./style/LargeModal.css";
import { LargeModalType, EntityFormType, LargeModalProps } from "./modalType.ts";
import { useDisableInput } from "../../hooks/useDisableInput.tsx"
import CheckboxFormGroup from "./CheckboxFormGroup.tsx";
import GenericFormGroup from "./GenericFormGroup.tsx";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const LargeModal = ({ titleModal, btnArray, typeOfModal, entityForm, onClose }: LargeModalProps) => {
  return (
    <div className="overlay background-gray">
      <div className="large-modal white">
        <h1 className="heading-form">{titleModal}</h1>
        <div className="form-group">
          <Form.Group as={Row} className="mb-4 row-width-form">
            <Form.Label column sm={6} bsPrefix="label-style text-start">
              Nombre De Cliente
            </Form.Label>
            <Col sm={6}>
              <Form.Control 
                type="text" 
                bsPrefix="encora-purple-input form-control"
                disabled={true}
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
                disabled={true}
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
                disabled={true}
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
                disabled={true}
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
                  disabled={true}
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
              <Form.Select 
                bsPrefix="encora-purple-input form-select"
                disabled={true}>
                <option>Ninguno</option>
                <option>PlaceHolder1</option> 
                <option>PlaceHolder1</option>
                <option>PlaceHolder1</option>
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-4 row-width-form">
            <Form.Label column sm={6} bsPrefix="label-style text-start">
              División
            </Form.Label>
            <Col sm={6}>
              <input 
                type="date"
                className="encora-purple-input form-control"
                disabled={true}
              >
              </input>
            </Col>
          </Form.Group>
        </div>
        <div className="button-wrapper">
          {btnArray && btnArray.map((btn => btn))}
          <button
            type="submit"
            className={
              "btn btn-primary " +
              (typeOfModal === "info" ? "encora-purple-button" : "gray-button")
            }
            onClick={() => onClose()}
          >
            {typeOfModal === "info" ? "Finalizar" : "Cancelar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LargeModal;