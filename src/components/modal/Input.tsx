import "../../index.css";
import "./Input.css";
import { InputType } from "./modalType";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

interface Props {
  inputType: InputType;
  disableInput?: boolean;
  text?: string;
  selectOptions?: string[];
}
const Input = ({ inputType, disableInput, text, selectOptions }: Props) => {
  switch (inputType) {
    case "text":
      return (
        <Col sm={6}>
          <Form.Control
            type="text"
            bsPrefix="encora-purple-input form-control"
            disabled={disableInput}
            value={text}
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
        <Col sm={6}>
          <Form.Check.Input
            type="checkbox"
            bsPrefix="encora-purple-check form-check-input"
            disabled={disableInput}
          />
          {text}
        </Col>
      );
    case "select":
      return (
        <Col sm={6}>
          <Form.Select
            bsPrefix="encora-purple-input form-select"
            disabled={disableInput}
          >
            {selectOptions?.map((option: string, index: number) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
        </Col>
      );
    case "date":
      text = text?.substring(0,10) 
      return (
        <Col sm={6}>
          <input
            type="date"
            className="encora-purple-input form-control"
            disabled={disableInput}
            value={text} 
          />
        </Col>
      );
    default:
      break;
  }
};

export default Input;
