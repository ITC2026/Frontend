import "./Input.css"
import "../../index.css";
import { InputType } from "./modalType";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { Dropdown, DropdownButton } from "react-bootstrap";

interface Props {
  inputType: InputType;
  disableInput?: boolean;
}

const Input = ({ inputType, disableInput }: Props) => {
  switch (inputType) {
    case null:
    case "text":
      return (
        <Col sm={6}>
          <Form.Control type="text" disabled={disableInput}/>
        </Col>
      );
    case "file":
      return (
        <Col sm={6}>
          <Form.Control
            type="file"
            bsPrefix="encora-purple-file form-control"
            disabled={disableInput}
          />
        </Col>
      );
    case "checkbox":
      return (
        <Form.Check.Input
          bsPrefix="encora-purple-check form-check-input"
          type={"checkbox"}
          disabled={disableInput}
        />
      );
    case "dropdown":
      return (
        <Col sm={6}>
          <DropdownButton
            id="dropdown-basic-button"
            title="Ninguno"
            bsPrefix="encora-purple-button dropdown-style btn"
            disabled={disableInput}
          >
            <Dropdown.Item
              bsPrefix="encora-purple-dropitem dropitem-style dropdown-item"
              href="#/action-1"
            >
              Placeholder
            </Dropdown.Item>
          </DropdownButton>
        </Col>
      );
    default:
      break;
  }
};

export default Input;