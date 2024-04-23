import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import { createClient } from "../../api/ClientAPI";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface Props {
  setActiveModal: (active: boolean) => void;
}

const ClientRegisterForm = (prop: Props) => {
  const [contractPdfUrl, setContractPdfUrl] = useState<string>("");
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [clientDescription, setClientDescription] = useState<string>("");
  const [hasHighGrowth, setHasHighGrowth] = useState<boolean>(false);
  const [selectedDivision, setSelectedDivision] = useState<Division>();
  const [validated, setValidated] = useState(false);

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const form = event.currentTarget;
    if (form.checkValidity()===false) {
      event.preventDefault();

      event.stopPropagation();
      console.log("Form is invalid"); 
      setValidated(true);
      return;
    }

    setValidated(true);

    const clientToSubmit: CreateClientAttributes = {
      contract_pdf_url: contractPdfUrl,
      logo_url: logoUrl,
      client_name: clientName,
      client_desc: clientDescription,
      high_growth: hasHighGrowth,
      division: "USA"
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
    <Form onSubmit={submitForm} noValidate validated={validated}>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Nombre De Cliente
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            required
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            type="text"
            bsPrefix="encora-purple-input form-control"

          /><Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Descripcion
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            value={clientDescription}
            onChange={(e) => setClientDescription(e.target.value)}
            type="text"
            bsPrefix="encora-purple-input form-control"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Contrato
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            value={contractPdfUrl}
            onChange={(e) => setContractPdfUrl(e.target.value)}
            type="text"
            bsPrefix="encora-purple-input form-control"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Logo
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            type="text"
            bsPrefix="encora-purple-input form-control"
          />
        </Col>
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
      </Form.Group>

      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          División
        </Form.Label>
        <Col sm={6}>
          <Form.Select 
          value={selectedDivision}
          onChange={(e) => setSelectedDivision(e.target.value as Division)}
        
          bsPrefix="encora-purple-input form-select">
            <option>Ninguno</option>
            <option>USA</option>
            <option>MEXICO</option>
            <option>BRAZIL</option>
          </Form.Select>
        </Col>
      </Form.Group>
      
      <button   
        type="button"
        className="btn btn-secondary" 
        onClick={() => prop.setActiveModal(false)}>Close</button>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </Form>
  );
};

export default ClientRegisterForm;
