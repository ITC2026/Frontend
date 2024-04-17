import "../../index.css";
import "./FormGroup.css";
import { InputType } from "./modalType";
import Input from "./Input";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

interface Props {
 nameLabel: string;
 inputType: InputType;
 disableInput?: boolean;
}

const GenericFormGroup = ({ nameLabel, inputType, disableInput }: Props) => {
  return (
    <Form.Group as={Row} className="mb-4 row-width-form">
      <Form.Label column sm={6} bsPrefix="label-style text-start">
        {nameLabel}
      </Form.Label>
      <Input inputType={inputType} disableInput={disableInput}/>
    </Form.Group>
  );
};

export default GenericFormGroup;