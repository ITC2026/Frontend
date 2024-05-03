import "../style/profilePic.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { modifyPerson } from "../../../../api/PersonAPI";
import { getPersonById } from "../../../../api/PersonAPI";
import { createEmployee } from "../../../../api/EmployeeAPI";

const ChangeStatePipelineForm = () => {
  const [name, setName] = useState<string>("");
  const [salary, setSalary] = useState<number>(0);
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      getPersonById(Number(id)).then((data) => {
        if (!data) {
          return;
        }
        setName(data.name);
      });
    }
  }, [id]);

  const handleModifyPerson = async (event: React.FormEvent<HTMLFormElement>) => {
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

    const personToSubmit: CreatePersonAttributes = {
      status: "Bench"
    };

    const id_num = Number(id);

    const employeeToSubmit: CreateEmployeeAttributes = {
      salary: salary,
      person_id: id_num,
    };

    console.log(JSON.stringify(personToSubmit));
    console.log(JSON.stringify(employeeToSubmit));

    modifyPerson(id_num, personToSubmit)
      .then(() => {
        console.log("Person submitted successfully");
        navigate("/resource/people");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error modifying person:", error);
      });

    // createEmployee(employeeToSubmit)
    //   .then(() => {
    //     console.log("Candidate submitted successfully");
    //   })
    //   .catch((error) => {
    //     console.error("Error submitting candidate:", error);
    //   });
  };

  return (
    <>
      <Form
        className="form-group"
        onSubmit={handleModifyPerson}
        validated={validated}
      >
        <Form.Group as={Row} className="mb-4 row-width-form">
          <Form.Label column sm={6} bsPrefix="label-style text-start">
            Nombre del Empleado
          </Form.Label>
          <Col sm={6}>
            <Form.Control
              disabled
              value={name}
              type="text"
              bsPrefix="encora-purple-input form-control"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-4 row-width-form">
          <Form.Label column sm={5} bsPrefix="label-style text-start">
            Salario (MXN)
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              type="text"
              placeholder="Introduzca su salario esperado en pesos"
              value={salary}
              bsPrefix="encora-purple-input form-control"
              onChange={(e) => setSalary(Number(e.target.value))}
            />
          </Col>
        </Form.Group>

        <div className="button-wrapper">
          <button
            className="btn btn-primary gray-button"
            onClick={() => navigate("/resource/people")}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="btn btn-primary encora-purple-button"
          >
            Modificar
          </button>

        </div>
      </Form>
    </>
  );
};

export default ChangeStatePipelineForm;
