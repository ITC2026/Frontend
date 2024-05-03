import Form from "react-bootstrap/Form";
import getPeopleNamesIDs from "../../../utils/People/GetPeopleNamesIDs";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PersonInfo = () => {
    const [, setPeople] = useState<{ id: number; first_name: string; last_name:string }[]>([]);
    const [personFirstName, setPersonFirstName] = useState<string>("");
    const [personLastName, setPersonLastName] = useState<string>("");
    const [personTechStack, setPersonTechStack] = useState<string>("");
    const [personExpectedSalary, setPersonExpectedSalary] = useState<string>("");

  useEffect(() => {
    getPeopleNamesIDs().then((data) => setPeople(data));
  }, []);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/people/${id}`)
        .then((response) => response.json())
        .then((data) => {
            setPersonFirstName(data.payload.first_name);
            setPersonLastName(data.payload.last_name);
            setPersonTechStack(data.payload.tech_stack);
            setPersonExpectedSalary(data.payload.expected_salary);
            
        });
    }
  }, [
    id,
    personFirstName,
    personLastName,
    personTechStack,
    personExpectedSalary,
    ]);

  const navigate = useNavigate();

  return (
    <Form>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          defaultValue={personFirstName}
          disabled
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Apellido</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your description"
          defaultValue={personLastName}
          disabled
        />
      </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicClientSelect">
            <Form.Label>Tech Stack</Form.Label>
            <Form.Control
            type="text"
            defaultValue={personTechStack}
            disabled
            />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicClientSelect">
            <Form.Label>Salario Esperado</Form.Label>
            <Form.Control
            type="text"
            defaultValue={personExpectedSalary}
            disabled
            />
        </Form.Group>

      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => navigate("/resource/people")}
      >
        Close
      </button>
    </Form>
  );
};

export default PersonInfo;
