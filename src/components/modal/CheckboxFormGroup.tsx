import "./FormGroup.css";
import "../../index.css";
import { InputType } from "./modalType";
import Input from "./Input";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface Props {
  nameLabel: string;
  inputType: InputType;
  disableInput?: boolean;
 }

const CheckboxFormGroup = ({ nameLabel, inputType, disableInput }: Props) => {
  return (
    <Form.Group as={Row} className="mb-4 row-width-form">
      <Col sm={6}>
        <Form.Check
          type={"checkbox"}
          bsPrefix="label-style text-start form-check"
        >
          <Input inputType={inputType} disableInput={disableInput}/>
          <Form.Check.Label>{nameLabel}</Form.Check.Label>
        </Form.Check>
      </Col>
    </Form.Group>
  );
};

export default CheckboxFormGroup;