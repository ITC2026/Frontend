import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import ShortModal from "../../modal/ShortModal";
import { createOpening, getOpeningById } from "../../../api/OpeningAPI";
import { useParams } from "react-router";
import { formatDate } from "../../../utils/Dates";


interface Props {
  type: string;
  onClose?: (active: boolean) => void;
  returnFunction?: (route: string) => void;
  route?: string;
}

const OpeningForm = (prop: Props) => {
  const [onlyInfo, setOnlyInfo] = useState<boolean>(false);
  const [onlyRegister, setOnlyRegister] = useState<boolean>(false);
  const [onlyModify, setOnlyModify] = useState<boolean>(false);
  const [hasExpirationDate, setHasExpirationDate] = useState<boolean>(false);
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [openingStatus, setOpeningStatus] = useState<string>("New");
  const [openingReason, setOpeningReason] = useState<string>("In Progress");
  const [showConfirmationRegister, setShowConfirmationRegister] =
    useState<boolean>(false);

  const updateOpening = (id: number) => {
    getOpeningById(id).then((data) => {
      if (!data) {
        return;
      }
      setExpirationDate(formatDate(data.expiration_date.expiration_date.toString()));
      setHasExpirationDate(data.has_expiration_date);
      setOpeningReason(data.opening_reason);
      setOpeningStatus(data.opening_status);
    });    
  };

  const { id } = useParams();
  useEffect(() => {
    switch (prop.type) {
      case "Register":
        setOnlyRegister(true);
        break;
      case "Modify":
        setOnlyModify(true);
        updateOpening(Number(id));
        break;
      case "Info":
        setOnlyInfo(true);
        break;
      default:
        // Handle any other cases or do nothing
        break;
    }
  }, [id, prop.type]);

  const handleModify = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentDate = Date();

    const openingToSubmit = {
      expiration_date: expirationDate,
      has_expiration_date: hasExpirationDate,
      opening_reason: openingReason,
      opening_status: openingStatus,
      start_date: currentDate,
      position_id: Number(id),
    };

    createOpening(openingToSubmit).then(() => {
      if (prop.onClose) {
        prop.onClose(false);
      }
      if (prop.returnFunction) {
        prop.returnFunction(prop.route || "");
      }
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (prop.type === "Register") {
      handleRegister(event);
    } else if (prop.type === "Modify") {
      handleModify(event);
    }
  };

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentDate = Date();

    const openingToSubmit: CreateOpeningAttributes = {
      expiration_date: expirationDate,
      has_expiration_date: hasExpirationDate,
      opening_reason: openingReason,
      opening_status: openingStatus,
      start_date: currentDate,
      position_id: Number(id),
    };

    createOpening(openingToSubmit).then(() => {
      if (prop.onClose) {
        prop.onClose(false);
      }
      if (prop.returnFunction) {
        prop.returnFunction(prop.route || "");
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Estado de la Vacante:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Escribe tu estado"
          defaultValue={openingStatus}
          disabled={onlyRegister || onlyInfo}
          onChange={(e) => setOpeningStatus(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Razón de la vacante</Form.Label>
        <Form.Control
          type="text"
          placeholder="Escribe tu razón."
          defaultValue={openingReason}
          disabled={onlyRegister || onlyInfo}
          onChange={(e) => setOpeningReason(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label="¿La vacante tiene una fecha de expiración?"
          checked={hasExpirationDate}
          onChange={(e) => setHasExpirationDate(e.target.checked)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDate">
        <Form.Label>Fecha de Expiración</Form.Label>
        <Form.Control
          type="date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
        />
      </Form.Group>

      {(onlyRegister || onlyModify) && (
        <Button
          onClick={() => {
            setShowConfirmationRegister(true);
          }}
        >
          {" "}
          Registrar{" "}
        </Button>
      )}

      {showConfirmationRegister && (
        <ShortModal
          typeOfModal="register"
          btnArray={[
            <button type="submit" className="btn btn-primary">
              Submit
            </button>,
          ]}
          setActiveModal={() => {
            return setShowConfirmationRegister(false);
          }}
        />
      )}
    </Form>
  );
};

export default OpeningForm;
