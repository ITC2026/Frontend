import Form from "react-bootstrap/Form";
import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClientById, modifyClient, deleteClient } from "../../api/ClientAPI";
import { uploadFile } from "../../firebase/initialize";
import { v4 as uuidv4 } from "uuid";

const clientLogoPath = "clients/logo/";
const clientContractPath = "clients/contract/";

const ClientModifyForm = () => {
  const [clientName, setClientName] = useState<string>("");
  const [clientDescription, setClientDescription] = useState<string>("");
  const [hasHighGrowth, setHasHighGrowth] = useState<boolean>(false);
  const [selectedDivision, setSelectedDivision] = useState<Division>("USA");
  const [validated, setValidated] = useState(false);
  const [logoFile, setLogoFile] = useState<File>();
  const [logoPath, setLogoPath] = useState<string>();
  const [originalLogoPath, setOriginalLogoPath] = useState<string>("");
  const [contractFile, setContractFile] = useState<File>();
  const [contractPath, setContractPath] = useState<string>();
  const [originalContractPath, setOriginalContractPath] = useState<string>("");
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
        setOriginalContractPath(data.contract_pdf_url);
        setContractPath(data.contract_pdf_url);
        setOriginalLogoPath(data.logo_url); 
        setLogoPath(data.logo_url);
        setHasHighGrowth(data.high_growth);
        setSelectedDivision(data.division);
      });
    }
  }, [
    id,
    setClientName,
    setClientDescription,
    setContractPath,
    setLogoPath,
    setHasHighGrowth,
    setSelectedDivision,
  ]);

  const handleModifyClient = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      console.log("Form is invalid");
      setValidated(true);
      return;
    }

    setValidated(true);
    let urlLogo = originalLogoPath;
    let urlContract = originalContractPath;

    if (originalLogoPath !== logoPath && logoPath && logoFile) {
      urlLogo = await uploadFile(logoFile, logoPath);
    } 

    if (originalContractPath !== contractPath && contractPath && contractFile) {
      urlContract = await uploadFile(contractFile, contractPath);
    }

    const clientToModify: CreateClientAttributes = {
      contract_pdf_url: urlContract,
      logo_url: urlLogo,
      client_name: clientName,
      client_desc: clientDescription,
      high_growth: hasHighGrowth,
      division: selectedDivision,
    };

    console.log(urlContract, urlLogo);
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
            Por favor ingresa un nombre 
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Descripcion
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
            Por favor ingresa una descripción 
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
            onChange={(e) => setSelectedDivision(e.target.value as Division)}
            bsPrefix="encora-purple-input form-select"
          >
            <option>USA</option>
            <option>MEXICO</option>
            <option>BRAZIL</option>
            <option>CSA</option>
          </Form.Select>
        </Col>
      </Form.Group>

      <div className="button-wrapper">
        <button type="submit" className="btn btn-primary encora-purple-button">
          Modificar
        </button>
        <button
          type="button"
          className="btn  btn-primary gray-button"
          onClick={() => navigate("/account_manager/clients")}
        >
          Cerrar
        </button>
        <button
          onClick={handleDeleteClient}
          type="button"
          className="btn red-encora-button "
        >
          Eliminar Cliente
        </button>
      </div>
    </Form>
  );
};

export default ClientModifyForm;
