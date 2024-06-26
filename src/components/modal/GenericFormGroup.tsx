import "../../index.css";
import "./style/FormGroup.css";
import Input from "./Input";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

type InputType = "text" | "file" | "checkbox" | "select" | "date"

interface Props {
 nameLabel: string;
 disableInput: boolean;
 inputType: InputType;
}

const GenericFormGroup = ({
  nameLabel,
  inputType,
  disableInput
}: Props) => {
  return (
    <Form.Group as={Row} className="mb-4 row-width-form">
      <Form.Label column sm={6} bsPrefix="label-style text-start">
        {nameLabel}
      </Form.Label>
      <Input
        inputType={inputType}
        disableInput={disableInput}
      />
    </Form.Group>
  );
};

export default GenericFormGroup;
