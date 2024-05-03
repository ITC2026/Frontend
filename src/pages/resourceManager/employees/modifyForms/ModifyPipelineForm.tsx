import "../style/profilePic.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import {
  genderOptions,
  techStackOptions,
  divisionOptions,
  regionOptions,
} from "../Options";
import MediumModal from "../../../../components/modal/MediumModal";
import { modifyPerson } from "../../../../api/PersonAPI";
import { getPersonById } from "../../../../api/PersonAPI";
import { uploadFile } from "../../../../firebase/initialize";
import { v4 as uuidv4 } from "uuid";
import ChangeStatePipelineForm from "./ChangeStatePipelineForm";
import ChangeStatePipelineBillingForm from "./ChangeStatePipelineBillingForm";

const peopleProfilePath = "people/profile/";

const ModifyPipelineForm = () => {
  const [showConfirmationModify, setShowConfirmationModify] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [profilePic, setProfilePic] = useState<File>();
  const [profilePicPath, setProfilePicPath] = useState<string>();
  const [originalProfilePicPath, setOriginalProfilePicPath] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<Gender | "Ninguno">("Ninguno");
  const [title, setTitle] = useState<string>("");
  const [techStack, setTechStack] = useState<TechStack | "Ninguno">("Ninguno");
  const [division, setDivision] = useState<Division | "Ninguno">("Ninguno");
  const [region, setRegion] = useState<Region | "Ninguno">("Ninguno");
  const [expectedSalary, setExpectedSalary] = useState<number>(0);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [validated, setValidated] = useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [modal, setModal] = useState<boolean>(false);  
  const toggleModal = (_prev: boolean) => { setModal((prev) => !prev); };

  const toggleModalBilling = (_prev: boolean) => { setModal((prev) => !prev); };

  useEffect(() => {
    if (id) {
      getPersonById(Number(id)).then((data) => {
        if(!data) {
          return;
        }
          setOriginalProfilePicPath(data.profile_picture);
          setProfilePicPath(data.profile_picture);
          setName(data.name);
          setPhoneNumber(data.phone);
          setEmail(data.email);
          setTitle(data.title);
          setStatus("Pipeline");
          setTechStack(data.tech_stack);
          setDivision(data.division);
          setRegion(data.region);
          setGender(data.gender);
          setExpectedSalary(data.expected_salary);
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
    let urlProfilePic = originalProfilePicPath;

    if (originalProfilePicPath !== profilePicPath) {
      if (!profilePic || !profilePicPath) {
        console.log("Profile Pic File is missing");
        return;
      }
      urlProfilePic = await uploadFile(profilePic, profilePicPath);
    } 

    const candidateToSubmit: CreatePersonAttributes = {
      profile_pic: urlProfilePic,
      name: name,
      phone: phoneNumber,
      email: email,
      title: title,
      tech_stack: techStack,
      division: division,
      region: region,
      gender: gender,
      expected_salary: expectedSalary,
      status: status
    };
    const id_num = Number(id);
    console.log(JSON.stringify(candidateToSubmit));

    modifyPerson(id_num, candidateToSubmit)
      .then(() => {
        setShowConfirmationModify(false);
        console.log("Person submitted successfully");
        navigate("/resource/people");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error modifying person:", error);
      });
  };

  return (
    <>
      <Form className="form-group-person" onSubmit={handleModifyPerson} validated={validated}>
        <div className="top-form">
          <div className="leftside-top-form">
            <Form.Group className="mb-3 personal-image">
              <label className="label">
                <input
                  accept="image/png, image/jpeg"
                  type="file"
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    if (target.files && target.files.length > 0) {
                      setProfilePic(target.files[0]);
                      setProfilePicPath(peopleProfilePath + uuidv4());
                    }
                  }}
                />
                <figure className="personal-figure">
                  <img
                    src={!profilePic ? originalProfilePicPath : URL.createObjectURL(profilePic)}
                    className="personal-avatar"
                    alt="avatar"
                  ></img>
                  <figcaption className="personal-figcaption">
                    <i className="bi bi-pencil-fill h1"></i>
                  </figcaption>
                </figure>
              </label>
            </Form.Group>
          </div>

          <div className="rightside-top-form">
            <Form.Group as={Row} className="mb-4 row-width-form">
              <Form.Label column sm={3} bsPrefix="label-style text-start">
                Nombre
              </Form.Label>
              <Col sm={7}>
                <Form.Control
                  type="text"
                  placeholder="Introduzca su nombre"
                  value={name}
                  bsPrefix="encora-purple-input form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-4 row-width-form">
              <Form.Label column sm={3} bsPrefix="label-style text-start">
                Género
              </Form.Label>
              <Col sm={7}>
                <Form.Control
                  as="select"
                  value={gender}
                  bsPrefix="encora-purple-input form-control"
                  onChange={(e) => setGender(e.target.value as Gender)}
                >
                  <option selected>Ninguno</option>
                  {Object.keys(genderOptions).map((genderOption) => (
                    <option key={genderOption} value={genderOption}>
                      {genderOptions[genderOption as Gender]}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
          </div>
        </div>

        <div className="bottom-form">
          <Form.Group as={Row} className="mb-4 row-width-form">
            <Form.Label column sm={5} bsPrefix="label-style text-start">
              Título de Trabajo
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                type="text"
                placeholder="Introduzca su título de Trabajo"
                value={title}
                bsPrefix="encora-purple-input form-control"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4 row-width-form">
            <Form.Label column sm={5} bsPrefix="label-style text-start">
              Tech Stack
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                as="select"
                value={techStack}
                bsPrefix="encora-purple-input form-control"
                onChange={(e) => setTechStack(e.target.value as TechStack)}
              >
                <option selected>Ninguno</option>
                {techStackOptions.map((techStackOption) => (
                  <option key={techStackOption} value={techStackOption}>
                    {techStackOption}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4 row-width-form">
            <Form.Label column sm={5} bsPrefix="label-style text-start">
              División
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                as="select"
                value={division}
                bsPrefix="encora-purple-input form-control"
                onChange={(e) => setDivision(e.target.value as Division)}
              >
                <option selected>Ninguno</option>
                {divisionOptions.map((divisionOption) => (
                  <option key={divisionOption} value={divisionOption}>
                    {divisionOption}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4 row-width-form">
            <Form.Label column sm={5} bsPrefix="label-style text-start">
              Región
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                as="select"
                value={region}
                bsPrefix="encora-purple-input form-control"
                onChange={(e) => setRegion(e.target.value as Region)}
              >
                <option selected>Ninguno</option>
                {regionOptions.map((regionOption) => (
                  <option key={regionOption} value={regionOption}>
                    {regionOption}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4 row-width-form">
            <Form.Label column sm={5} bsPrefix="label-style text-start">
              Salario Esperado (MXN)
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                type="text"
                placeholder="Introduzca su salario esperado en pesos"
                value={expectedSalary}
                bsPrefix="encora-purple-input form-control"
                onChange={(e) => setExpectedSalary(Number(e.target.value))}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4 row-width-form">
            <Form.Label column sm={5} bsPrefix="label-style text-start">
              Teléfono de Contacto
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                type="text"
                placeholder="Introduzca el télefono de contacto"
                value={phoneNumber}
                bsPrefix="encora-purple-input form-control"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4 row-width-form">
            <Form.Label column sm={5} bsPrefix="label-style text-start">
              Correo de Contacto
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                type="text"
                placeholder="Introduzca su correo de contacto"
                value={email}
                bsPrefix="encora-purple-input form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
          </Form.Group>
        </div>

        <div className="button-wrapper">

          <button
            className="btn btn-primary gray-button"
            onClick={() => navigate("/resource/people")}
          >
            Cancelar
          </button>

          <button 
            type="button"
            className="btn btn-primary green-encora-button"
            onClick={() => toggleModal(true)}
          >
            Cambiar Estado a Bench
          </button>

          <button 
            type="button"
            className="btn btn-primary blue-encora-button"
            onClick={() => toggleModalBilling(true)}
          >
            Cambiar Estado a Billing
          </button>

          <button 
          type="submit" 
          className="btn btn-primary encora-purple-button"
          onClick={() => setShowConfirmationModify(true)}>
            Modificar
          </button>
        </div>
      </Form>
      {modal && (
        <MediumModal
        content={<ChangeStatePipelineForm/>}
        onClose={() => setShowConfirmationModify(false)}
      />
      )}
      {modal && (
        <MediumModal
        content={<ChangeStatePipelineBillingForm/>}
        onClose={() => setShowConfirmationModify(false)}
      />
      )}
    </>
  );
};

export default ModifyPipelineForm;