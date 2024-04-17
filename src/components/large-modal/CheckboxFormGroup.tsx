import "./LargeModal.css";
import "../../index.css";
import { InputType } from "./LargeModal";
import Input from "./Input";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface Props {
  nameAttribute: string;
  inputType: InputType;
  disableInput?: boolean;
 }

const CheckboxFormGroup = ({ nameAttribute, inputType, disableInput }: Props) => {
  return (
    <Form.Group as={Row} className="mb-4 row-width">
      <Col sm={6}>
        <Form.Check
          type={"checkbox"}
          bsPrefix="label-style text-start form-check"
        >
          <Input inputType={inputType} disableInput={disableInput}/>
          <Form.Check.Label>{nameAttribute}</Form.Check.Label>
        </Form.Check>
      </Col>
    </Form.Group>
  );
};

export default CheckboxFormGroup;