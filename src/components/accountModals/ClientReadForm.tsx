import Form from "react-bootstrap/Form";
import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClientById } from "../../api/ClientAPI";

const ClientReadForm = () => {
  const [contractPdfUrl, setContractPdfUrl] = useState<string>("");
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [clientDescription, setClientDescription] = useState<string>("");
  const [hasHighGrowth, setHasHighGrowth] = useState<boolean>(false);
  const [selectedDivision, setSelectedDivision] = useState<Division>();

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      getClientById(Number(id)).then((data) => {
        if (!data) {
          return;
        }
        setClientName(data.client_name);
        setClientDescription(data.client_desc);
        setContractPdfUrl(data.contract_pdf_url);
        setLogoUrl(data.logo_url);
        setHasHighGrowth(data.high_growth);
        setSelectedDivision(data.division);
      });
    }
  }, [id]);

  return (
    <Form className="form-group" noValidate>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Nombre del Cliente
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            required
            value={clientName}
            type="text"
            bsPrefix="encora-purple-input form-control"
            disabled
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Descripción
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            value={clientDescription}
            type="text"
            bsPrefix="encora-purple-input form-control"
            disabled
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Contrato
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            accept=".pdf"
            type="file"
            bsPrefix="encora-purple-input form-control"
            disabled
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Logo
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            accept="image/png, image/jpeg"
            type="file"
            bsPrefix="encora-purple-input form-control"
            disabled
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
              disabled
            />
            <Form.Check.Label>Es High-Growth Client?</Form.Check.Label>
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
            bsPrefix="encora-purple-input form-select"
            disabled
          >
            <option>Ninguno</option>
            <option>USA</option>
            <option>MEXICO</option>
            <option>BRAZIL</option>
          </Form.Select>
        </Col>
      </Form.Group>

      <div className="button-wrapper">
        <button
          type="button"
          className="btn btn-primary gray-button"
          onClick={() => navigate("/account_manager/clients")}
        >
          Cerrar
        </button>
      </div>
    </Form>
  );
};

export default ClientReadForm;
