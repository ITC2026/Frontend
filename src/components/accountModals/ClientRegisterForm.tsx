import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import { createClient } from "../../api/ClientAPI";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { uploadFile } from "../../firebase/initialize";
import { v4 as uuidv4 } from "uuid";

const clientLogoPath = "clients/logo/";
const clientContractPath = "clients/contract/";

interface Props {
  setActiveModal: (active: boolean) => void;
}

const ClientRegisterForm = (prop: Props) => {
  const [clientName, setClientName] = useState<string>("");
  const [clientDescription, setClientDescription] = useState<string>("");
  const [hasHighGrowth, setHasHighGrowth] = useState<boolean>(false);
  const [selectedDivision, setSelectedDivision] = useState<Division>();
  const [validated, setValidated] = useState(false);
  const [logoFile, setLogoFile] = useState<File>();
  const [logoPath, setLogoPath] = useState<string>();
  const [contractFile, setContractFile] = useState<File>();
  const [contractPath, setContractPath] = useState<string>();

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      console.log("Form is invalid");
      setValidated(true);
      return;
    }

    setValidated(true);
    if (!logoFile || !logoPath || !contractFile || !contractPath) {
      console.log("Files are missing");
      return;
    }

    const urlContract = await uploadFile(contractFile, contractPath);
    const urlLogo = await uploadFile(logoFile, logoPath);

    const clientToSubmit: CreateClientAttributes = {
      contract_pdf_url: urlContract,
      logo_url: urlLogo,
      client_name: clientName,
      client_desc: clientDescription,
      high_growth: hasHighGrowth,
      division: selectedDivision,
    };

    console.log(`Submitting project: ${JSON.stringify(clientToSubmit)}`);
    createClient(clientToSubmit)
      .then(() => {
        console.log("Client submitted successfully");
        prop.setActiveModal(false);
      })
      .catch((error) => {
        console.error("Error submitting project:", error);
      });
  };

  return (
    <Form
      className="form-group"
      onSubmit={submitForm}
      noValidate
      validated={validated}
    >
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Nombre del Cliente
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            required
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            type="text"
            bsPrefix="encora-purple-input form-control"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Descripción
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            required
            value={clientDescription}
            onChange={(e) => setClientDescription(e.target.value)}
            type="text"
            bsPrefix="encora-purple-input form-control"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Contrato
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            //required
            accept=".pdf"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              if (target.files && target.files.length > 0) {
                setContractFile(target.files[0]);
                setContractPath(clientContractPath + uuidv4());
              }
            }}
            type="file"
            bsPrefix="encora-purple-input form-control"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Logo
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            // required
            accept="image/png, image/jpeg"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              if (target.files && target.files.length > 0) {
                setLogoFile(target.files[0]);
                setLogoPath(clientLogoPath + uuidv4());
              }
            }}
            type="file"
            bsPrefix="encora-purple-input form-control"
          />
        </Col>
        <Form.Control.Feedback type="invalid">
          Please provide a valid zip.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Row} className="mb-4 row-width-form">
        <Col sm={6}>
          <Form.Check
            type={"checkbox"}
            bsPrefix="label-style text-start form-check"
          >
            <Form.Check.Input
              type="checkbox"
              bsPrefix="encora-purple-check form-check-input"
              checked={hasHighGrowth}
              onChange={(e) => setHasHighGrowth(e.target.checked)}
            />
            <Form.Check.Label>High-Growth Client</Form.Check.Label>
          </Form.Check>
        </Col>
        <Form.Control.Feedback type="invalid">
          Please provide a valid zip.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          División
        </Form.Label>
        <Col sm={6}>
          <Form.Select
            required
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value as Division)}
            bsPrefix="encora-purple-input form-select"
          >
            <option>USA</option>
            <option>MEXICO</option>
            <option>BRAZIL</option>
          </Form.Select>
        </Col>
        <Form.Control.Feedback type="invalid">
          Please provide a valid zip.
        </Form.Control.Feedback>
      </Form.Group>

      <div className="button-wrapper">
        <button type="submit" className="btn btn-primary encora-purple-button">
          Subir
        </button>
        <button
          type="button"
          className="btn  btn-primary gray-button"
          onClick={() => prop.setActiveModal(false)}
        >
          Cerrar
        </button>
      </div>
    </Form>
  );
};

export default ClientRegisterForm;
