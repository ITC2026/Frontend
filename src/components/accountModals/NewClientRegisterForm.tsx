import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import { createClient } from "../../api/ClientAPI";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface Props {
  setActiveModal: (active: boolean) => void;
}

const ClientRegisterForm = (prop: Props) => {
  const [clientName, setClientName] = useState<string>("");
  const [clientDescription, setClientDescription] = useState<string>("");
  const [contractPdfUrl, setContractPdfUrl] = useState<string>("");
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [hasHighGrowth, setHasHighGrowth] = useState<boolean>(false);
  const [selectedDivision, setSelectedDivision] = useState<Division>();

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const clientToSubmit: CreateClientAttributes = {
      client_name: clientName,
      client_desc: clientDescription,
      contract_pdf_url: contractPdfUrl,
      logo_url: logoUrl,
      high_growth: hasHighGrowth,
      division: "USA",
    };

    console.log(`Submitting project: ${JSON.stringify(clientToSubmit)}`);
    createClient(clientToSubmit)
      .then(() => {
        console.log("Project submitted successfully");
        prop.setActiveModal(false);
      })
      .catch((error) => {
        console.error("Error submitting project:", error);
      });
  };

  return (
    <Form onSubmit={submitForm}>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Nombre De Cliente
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            type="text"
            bsPrefix="encora-purple-input form-control"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Descripcion
        </Form.Label>
        <Col sm={6}>
          <Form.Control
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
            type="file"
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
            type="file"
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
          <Form.Select bsPrefix="encora-purple-input form-select">
            <option>Ninguno</option>
            <option>PlaceHolder1</option>
            <option>PlaceHolder1</option>
            <option>PlaceHolder1</option>
          </Form.Select>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          División
        </Form.Label>
        <Col sm={6}>
          <input
            type="date"
            className="encora-purple-input form-control"
          ></input>
        </Col>
      </Form.Group>

      <button onClick={() => prop.setActiveModal(false)}>Close</button>
    </Form>
  );
};

export default ClientRegisterForm;
