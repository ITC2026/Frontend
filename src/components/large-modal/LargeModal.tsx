import "./LargeModal.css";
import "../../index.css";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

type InputType = "text" | "button" | "check" | "dropdown" | "date" | null;
type ModalType = "Info" | "Register" | "Modify";

interface Props {
  titleModal: string;
  btnArr?: React.ReactNode[];
  typeOfModal: ModalType;
  entityAttributes: {
    Entity: string;
    Attributes: {
      [key: string]: InputType;
    };
  };
  onClose: () => void;
}

const renderInput = (input: InputType) => {
  switch (input) {
    case "text":
      return <Form.Control type="name" placeholder="" />;
    case "button":
      return <Button type="submit">Upload</Button>;
    case "check":
      return <Form.Check label="aglasdg" />;
    case "dropdown":
      return (
        <DropdownButton id="dropdown-basic-button" title="None">
          <Dropdown.Item href="#/action-1">Brazil</Dropdown.Item>
          <Dropdown.Item href="#/action-2">México</Dropdown.Item>
          <Dropdown.Item href="#/action-3">
            Central & South America
          </Dropdown.Item>
        </DropdownButton>
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

  const renderPropertiesInfo = () => {
    return Object.keys(Attributes).map((item) => {
      return <p key={item}>{item}</p>;
    });
  };

  const renderPropertiesRegister = () => {
    return Object.keys(Attributes).map((key, value) => {
      if (Attributes[key] == "check") {
        return (
          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 3, offset: 1 }}>
              <Form.Check label={key} />
            </Col>
          </Form.Group>
        );
      } else if (Attributes[key] !== null) {
        return (
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2} className="text-start">
              {key}
            </Form.Label>
            <Col sm={5}>{renderInput(Attributes[key])}</Col>
          </Form.Group>
        );
      }
    });
  };

  const renderPropertiesModify = () => {
    return Object.keys(Attributes).map((item, value) => {
      if (Attributes[item] !== null) {
        return <p key={item}>{item}</p>;
      }
    });
  };

  const renderProperties = () => {
    switch (typeOfModal) {
      case "Info":
        return renderPropertiesInfo();
      case "Register":
        return renderPropertiesRegister();
      case "Modify":
        return renderPropertiesModify();
      default:
        return null;
    }
  };

  return (
    <div className="overlay background-gray">
      <div className="large-modal white">
        <h1>{titleModal}</h1>
        <div>{renderProperties()}</div>
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
