import Form from "react-bootstrap/Form";
import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClientById } from "../../api/ClientAPI";

interface Props {
  setActiveModal: (active: boolean) => void;
}

const PostulateInfoForm = (prop: Props) => {
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
          Título de Trabajo
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            //value={}
            type="text"
            bsPrefix="encora-purple-input form-control"
            disabled
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Tech Stack
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            //value={}
            type="text"
            bsPrefix="encora-purple-input form-control"
            disabled
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          División
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            //value={}
            type="text"
            bsPrefix="encora-purple-input form-control"
            disabled
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Región
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            //value={}
            type="text"
            bsPrefix="encora-purple-input form-control"
            disabled
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Job Grade
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            //value={}
            type="text"
            bsPrefix="encora-purple-input form-control"
            disabled
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Salario
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            //value={}
            type="text"
            bsPrefix="encora-purple-input form-control"
            disabled
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Teléfono de Contacto
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            //value={}
            type="text"
            bsPrefix="encora-purple-input form-control"
            disabled
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Correo de Contacto
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            //value={}
            type="text"
            bsPrefix="encora-purple-input form-control"
            disabled
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          ID del Candidato
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            //value={}
            type="text"
            bsPrefix="encora-purple-input form-control"
            disabled
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Creado en
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            //value={}
            type="text"
            bsPrefix="encora-purple-input form-control"
            disabled
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Última Actualización
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            //value={}
            type="text"
            bsPrefix="encora-purple-input form-control"
            disabled
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Razón de Bench
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            //value={}
            type="text"
            bsPrefix="encora-purple-input form-control"
            disabled
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Acción Porpuesta
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            //value={}
            type="text"
            bsPrefix="encora-purple-input form-control"
            disabled
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Cliente Actual
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            //value={}
            type="text"
            bsPrefix="encora-purple-input form-control"
            disabled
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Cliente Anterior
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            //value={}
            type="text"
            bsPrefix="encora-purple-input form-control"
            disabled
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Empleado Desde
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            //value={}
            type="text"
            bsPrefix="encora-purple-input form-control"
            disabled
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Bench Desde
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            //value={}
            type="text"
            bsPrefix="encora-purple-input form-control"
            disabled
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Días en Bench
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            //value={}
            type="text"
            bsPrefix="encora-purple-input form-control"
            disabled
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-4 row-width-form">
        <Form.Label column sm={6} bsPrefix="label-style text-start">
          Inicio del Contrato
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            //value={}
            type="text"
            bsPrefix="encora-purple-input form-control"
            disabled
          />
        </Col>
      </Form.Group>

      <div className="button-wrapper">
        <button
          type="button"
          className="btn btn-primary gray-button"
          onClick={() => prop.setActiveModal(false)}
        >
          Cerrar
        </button>
      </div>
    </Form>
  );
};

export default PostulateInfoForm;
