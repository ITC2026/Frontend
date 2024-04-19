import "../../index.css";
import "./style/Input.css";
import { InputType } from "./modalType";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import React from "react";
interface Props {
  inputType: InputType;
  text?: string;
  selectOptions?: string[];
  disableInput: boolean;
  onChange?: (value: string | number) => void;
}
const Input = ({
  inputType,
  disableInput,
  text,
  selectOptions,
  onChange,
}: Props) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value); // Call the onChange function with the new value
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      const selectedIndex = e.target.selectedIndex;
      const selectedKey = e.target.options[selectedIndex].getAttribute('key');
      if (!selectedKey) { return; } 
      onChange(selectedKey); // Call the onChange function with the selected key
    }
  };

  switch (inputType) {
    case "text":
      return (
        <Col sm={6}>
          <Form.Control
            type="text"
            bsPrefix="encora-purple-input form-control"
            disabled={disableInput}
            defaultValue={text || ""}
            onChange={handleInputChange}
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
            onChange={handleSelectChange}
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
      text = text?.substring(0, 10);
      return (
        <Col sm={6}>
          <input
            type="date"
            className="encora-purple-input form-control"
            disabled={disableInput}
            defaultValue={text}
            onChange={handleInputChange}
          />
        </Col>
      );
    default:
      break;
  }
};

export default Input;
