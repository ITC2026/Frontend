import "./LargeModal.css";
import "../../index.css";
import { InputType } from "./LargeModal";
import Input from "./Input";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

interface Props {
 nameAttribute: string;
 inputType: InputType;
 disableInput?: boolean;
}

const GenericFormGroup = ({ nameAttribute, inputType, disableInput }: Props) => {
  return (
    <Form.Group as={Row} className="mb-4 row-width">
      <Form.Label column sm={6} bsPrefix="label-style text-start">
        {nameAttribute}
      </Form.Label>
      <Input inputType={inputType} disableInput={disableInput}/>
    </Form.Group>
  );
};

export default GenericFormGroup;