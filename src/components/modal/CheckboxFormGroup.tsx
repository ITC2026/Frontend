import "../../index.css";
import "./style/FormGroup.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface Props {
  nameLabel: string;
  disableInput: boolean;
}

const CheckboxFormGroup = ({ nameLabel, disableInput }: Props) => {
  return (
    <Form.Group as={Row} className="mb-4 row-width-form">
      <Col sm={6}>
        <Form.Check
          type={"checkbox"}
          bsPrefix="label-style text-start form-check"
        >

          <Form.Check.Input
            type="checkbox"
            bsPrefix="encora-purple-check form-check-input"
            disabled={disableInput}
          />
          <Form.Check.Label>{nameLabel}</Form.Check.Label>
        </Form.Check>
      </Col>
    </Form.Group>
  );
};

export default CheckboxFormGroup;
