import Form from "react-bootstrap/Form";
import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClientById, modifyClient, deleteClient } from "../../api/ClientAPI";

const ClientModifyForm = () => {
  const [contractPdfUrl, setContractPdfUrl] = useState<string>("");
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [clientDescription, setClientDescription] = useState<string>("");
  const [hasHighGrowth, setHasHighGrowth] = useState<boolean>(false);
  const [selectedDivision, setSelectedDivision] = useState<Division>();

  const [validated, setValidated] = useState(false);
  const [logoFile, setLogoFile] = useState<File>();
  const [logoPath, setLogoPath] = useState<string>();
  const [contractFile, setContractFile] = useState<File>();
  const [contractPath, setContractPath] = useState<string>();

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handleDeleteClient = () => {
    console.log("Delete client");
    deleteClient(Number(id))
      .then(() => {
        console.log("Client deleted successfully");
        navigate("/account_manager/clients");
      })
      .catch((error) => {
        console.error("Error deleting client:", error);
      });
  };

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
  }, [
    id,
    setClientName,
    setClientDescription,
    setContractPdfUrl,
    setLogoUrl,
    setHasHighGrowth,
    setSelectedDivision,
  ]);

  const handleModifyClient = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const clientToModify: CreateClientAttributes = {
      contract_pdf_url: contractPdfUrl,
      logo_url: logoUrl,
      client_name: clientName,
      client_desc: clientDescription,
      high_growth: hasHighGrowth,
      division: selectedDivision,
    };

    const id_num = Number(id);

    modifyClient(id_num, clientToModify)
      .then(() => {
        console.log("Client modified successfully");
        navigate("/account_manager/clients");
      })
      .catch((error) => {
        console.error("Error modifying client:", error);
      });
  };

  return (
    <Form
      className="form-group"
      onSubmit={handleModifyClient}
      noValidate
      validated={validated}
    >
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
          />
          <Form.Control.Feedback type="invalid">
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
            accept=".pdf"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setContractFile(e.target.files[0]);
              }
            }}
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
            accept="image/png, image/jpeg"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setLogoFile(e.target.files[0]);
              }
            }}
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
            bsPrefix="encora-purple-input form-select"
          >
            <option>Ninguno</option>
            <option>USA</option>
            <option>MEXICO</option>
            <option>BRAZIL</option>
          </Form.Select>
        </Col>
      </Form.Group>

      <div className="button-wrapper">
        <button type="button" className="btn  btn-primary ">
          Eliminar Cliente
        </button>
        <button
          type="button"
          className="btn  btn-primary gray-button"
          onClick={() => navigate("/account_manager/clients")}
        >
          Close
        </button>
        <button type="submit" className="btn btn-primary encora-purple-button">
          Modify
        </button>
      </div>
    </Form>
  );
};

export default ClientModifyForm;
