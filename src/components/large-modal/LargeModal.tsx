import "./LargeModal.css";
import "../../index.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

type InputType = "text" | "file" | "checkbox" | "dropdown" | "date" | null;

export type ModalType = "Info" | "Register" | "Modify" | null;

export interface EntityAttributesType {
  Entity: string;
  Attributes: {
    [key: string]: InputType;
  };
}

interface Props {
  titleModal: string;
  btnArr?: React.ReactNode[];
  typeOfModal: ModalType;
  entityAttributes: EntityAttributesType;
  onClose: () => void;
}

const renderInput = (nameInput: string, input: InputType) => {
  switch (input) {
    case "text":
      return (
        <>
          <Col sm={6}>
            <Form.Control type="text" disabled />
          </Col>
        </>
      );
    case "file":
      return (
        <>
          <Col sm={6}>
            <Form.Control
              disabled
              type="file"
              bsPrefix="encora-purple-file form-control"
            />
          </Col>
        </>
      );
    case "dropdown":
      return (
        <>
          <Col sm={{ span: 1 }}>
            <DropdownButton
              disabled
              id="dropdown-basic-button"
              title="Ninguno"
              bsPrefix="encora-purple-button dropdown-style btn"
            >
              <Dropdown.Item
                bsPrefix="encora-purple-dropitem dropitem-style dropdown-item"
                href="#/action-1"
              >
                Placeholder
              </Dropdown.Item>
              <Dropdown.Item
                bsPrefix="encora-purple-dropitem dropitem-style dropdown-item"
                href="#/action-1"
              >
                Placeholder
              </Dropdown.Item>
              <Dropdown.Item
                bsPrefix="encora-purple-dropitem dropitem-style dropdown-item"
                href="#/action-1"
              >
                Placeholder
              </Dropdown.Item>
            </DropdownButton>
          </Col>
        </>
      );
    default:
      return null;
  }
};

const LargeModal = ({
  titleModal,
  btnArr,
  typeOfModal,
  entityAttributes,
  onClose,
}: Props) => {
  const { Attributes } = entityAttributes;

  const renderFormAsRegister = () => {
    return Object.keys(Attributes).map((nameInput: string) => {
      if (Attributes[nameInput] == "checkbox") {
        return (
          <Form.Group as={Row} className="mb-4 row-width">
            <Col sm={{ span: 6 }}>
              <Form.Check
                type={"checkbox"}
                bsPrefix="label-style text-start form-check"
              >
                <Form.Check.Input
                  bsPrefix="encora-purple-check form-check-input"
                  type={"checkbox"}
                />
                <Form.Check.Label>{nameInput}</Form.Check.Label>
              </Form.Check>
            </Col>
          </Form.Group>
        );
      } else if (Attributes[nameInput] !== null) {
        return (
          <Form.Group as={Row} className="mb-4 row-width">
            <Form.Label column sm={6} bsPrefix="label-style text-start">
              {nameInput}
            </Form.Label>
            {renderInput(nameInput, Attributes[nameInput])}
          </Form.Group>
        );
      }
    });
  };

  const renderFormAsModify = () => {
    return Object.keys(Attributes).map((nameInput: string) => {
      if (Attributes[nameInput] == "checkbox") {
        return (
          <Form.Group as={Row} className="mb-4 row-width">
            <Col sm={{ span: 6 }}>
              <Form.Check
                type={"checkbox"}
                bsPrefix="label-style text-start form-check"
              >
                <Form.Check.Input
                  bsPrefix="encora-purple-check form-check-input"
                  type={"checkbox"}
                />
                <Form.Check.Label>{nameInput}</Form.Check.Label>
              </Form.Check>
            </Col>
          </Form.Group>
        );
      } else if (Attributes[nameInput] !== null) {
        return (
          <Form.Group as={Row} className="mb-4 row-width">
            <Form.Label column sm={6} bsPrefix="label-style text-start">
              {nameInput}
            </Form.Label>
            {renderInput(nameInput, Attributes[nameInput])}
          </Form.Group>
        );
      }
    });
  };

  const renderFormAsInfo = () => {
    return Object.keys(Attributes).map((nameInput: string) => {
      if (Attributes[nameInput] == "checkbox") {
        return (
          <Form.Group as={Row} className="mb-4 row-width">
            <Col sm={{ span: 6 }}>
              <Form.Check
                type={"checkbox"}
                bsPrefix="label-style text-start form-check"
              >
                <Form.Check.Input
                  disabled
                  bsPrefix="encora-purple-check form-check-input"
                  type={"checkbox"}
                />
                <Form.Check.Label>{nameInput}</Form.Check.Label>
              </Form.Check>
            </Col>
          </Form.Group>
        );
      }
      return (
        <Form.Group as={Row} className="mb-4 row-width">
          <Form.Label column sm={6} bsPrefix="label-style text-start">
            {nameInput}
          </Form.Label>
          {renderInput(nameInput, Attributes[nameInput])}
        </Form.Group>
      );
    });
  };

  const renderForm = () => {
    switch (typeOfModal) {
      case "Info":
        return renderFormAsInfo();
      case "Register":
        return renderFormAsRegister();
      case "Modify":
        return renderFormAsModify();
      default:
        return null;
    }
  };

  return (
    <div className="overlay background-gray">
      <div className="large-modal white">
        <h1 className="heading-form">{titleModal}</h1>
        <div className="form-group">{renderForm()}</div>
        <div className="button-wrapper">
          {btnArr && btnArr.map((btn) => btn)}
          <button
            type="submit"
            className={
              "btn btn-primary " +
              (typeOfModal === "Info" ? "encora-purple-button" : "gray-button")
            }
            onClick={() => onClose()}
          >
            {typeOfModal === "Info" ? "Finalizar" : "Cancelar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LargeModal;
