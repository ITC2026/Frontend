import "../style/profilePic.css";
import ProfilePicPlaceholder from "../../../../assets/profilepic_placeholder.png";
import Form from "react-bootstrap/Form";
import { useState } from "react";

interface Props {
  setActiveModal: (active: boolean) => void;
}

const RegisterPipelineForm = (props: Props) => {
  const [profilePic, setProfilePic] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<Gender | "Ninguno">("Ninguno");
  const [title, setTitle] = useState<string>("");
  const [techStack, setTechStack] = useState<TechStack | "Ninguno">("Ninguno");
  const [division, setDivision] = useState<Division | "Ninguno">("Ninguno");
  const [region, setRegion] = useState<Region | "Ninguno">("Ninguno");
  const [expectedSalary, setExpectedSalary] = useState<number>(0);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const genderOptions: Record<Gender, string> = {
    Male: "Hombre",
    Female: "Mujer",
    Nonbinary: "No Binario",
    "Did Not Want to Say": "No quiero mencionar",
  };

  const techStackOptions: TechStack[] = [
    "Java",
    "React",
    "Python",
    "Automation",
    "Golang",
    "Javascript",
    ".NET",
    "Angular",
    "Appian",
    "PowerApps",
    "Manual Tester",
    "Kotlin",
    "UX",
    "iOS",
  ];

  const divisionOptions: Division[] = ["BRAZIL", "MEXICO", "CSA", "USA"];

  const regionOptions: Region[] = [
    "CDMX",
    "CUU",
    "HMO",
    "MID",
    "SLP",
    "CAMPINA",
    "SAO PAULO",
    "COLOMBIA",
    "PERU",
    "COSTA RICA",
    "ARGENTINA",
    "DOMINICANA",
    "DALLAS",
    "PHOENIX",
  ];

  return (
    <Form>
      <Form.Group className="mb-3 personal-image" controlId="formBasicEmail">
        <label className="label">
          <input
            accept="image/png, image/jpeg"
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setProfilePic(URL.createObjectURL(e.target.files[0]));
              }
            }}
          />
          <figure className="personal-figure">
            <img
              src={!profilePic ? ProfilePicPlaceholder : profilePic}
              className="personal-avatar"
              alt="avatar"
            ></img>
            <figcaption className="personal-figcaption">
              <i className="bi bi-pencil-fill h1"></i>
            </figcaption>
          </figure>
        </label>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          placeholder="Introduzca su nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicClientSelect">
        <Form.Label>Género</Form.Label>
        <Form.Control
          as="select"
          value={gender}
          onChange={(e) => setGender(e.target.value as Gender)}
        >
          <option selected>Ninguno</option>
          {Object.keys(genderOptions).map((genderOption) => (
            <option key={genderOption} value={genderOption}>
              {genderOptions[genderOption as Gender]}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Título de Trabajo</Form.Label>
        <Form.Control
          type="text"
          placeholder="Introduzca su título de Trabajo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicClientSelect">
        <Form.Label>Tech Stack</Form.Label>
        <Form.Control
          as="select"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value as TechStack)}
        >
          <option selected>Ninguno</option>
          {techStackOptions.map((techStackOption) => (
            <option key={techStackOption} value={techStackOption}>
              {techStackOption}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicClientSelect">
        <Form.Label>División</Form.Label>
        <Form.Control
          as="select"
          value={division}
          onChange={(e) => setDivision(e.target.value as Division)}
        >
          <option selected>Ninguno</option>
          {divisionOptions.map((divisionOption) => (
            <option key={divisionOption} value={divisionOption}>
              {divisionOption}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicClientSelect">
        <Form.Label>Región</Form.Label>
        <Form.Control
          as="select"
          value={region}
          onChange={(e) => setRegion(e.target.value as Region)}
        >
          <option selected>Ninguno</option>
          {regionOptions.map((regionOption) => (
            <option key={regionOption} value={regionOption}>
              {regionOption}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Salario Esperado (MXN)</Form.Label>
        <Form.Control
          type="text"
          placeholder="Introduzca su salario esperado en pesos"
          value={expectedSalary}
          onChange={(e) => setExpectedSalary(Number(e.target.value))}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Teléfono de Contacto</Form.Label>
        <Form.Control
          type="text"
          placeholder="Introduzca el télefono de contacto"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Correo de Contacto</Form.Label>
        <Form.Control
          type="text"
          placeholder="Introduzca su correo de contacto"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => props.setActiveModal(false)}
      >
        Close
      </button>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </Form>
  );
};

export default RegisterPipelineForm;
