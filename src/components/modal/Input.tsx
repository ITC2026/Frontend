import "./Input.css"
import "../../index.css";
import { InputType } from "./modalType";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

interface Props {
  inputType: InputType;
  disableInput?: boolean;
}

const Input = ({ inputType, disableInput }: Props) => {
  switch (inputType) {
    case "text":
      return (
        <Col sm={6}>
          <Form.Control 
            type="text" 
            bsPrefix="encora-purple-input form-control"
            disabled={disableInput}
          />
        </Col>
      );
    case "file":
      return (
        <Col sm={6}>
          <Form.Control
            type="file"
            bsPrefix="encora-purple-input form-control"
            disabled={disableInput}
          />
        </Col>
      );
    case "checkbox":
      return (
        <Form.Check.Input
          type="checkbox"
          bsPrefix="encora-purple-check form-check-input"
          disabled={disableInput}
        />
      );
    case "select":
      return (
        <Col sm={6}>
          <Form.Select 
            bsPrefix="encora-purple-input form-select"
            disabled={disableInput}>
            <option>Ninguno</option>
            <option>PlaceHolder1</option> 
            <option>PlaceHolder1</option>
            <option>PlaceHolder1</option>
          </Form.Select>
        </Col>
      );
    case "date":
      return (
        <>
        </>
      )
    default:
      break;
  }
};

export default Input;