import "../style/profilePic.css";
import ProfilePicPlaceholder from "../../../../assets/profilepic_placeholder.png";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useState, useEffect } from "react";
import {useParams, useNavigate} from "react-router";
import getProjectNamesAndIds from "../../../../utils/People/GetProjectNamesId";
import getPositionNamesAndIds from "../../../../utils/People/GetPositionNamesId";
import {
  genderOptions,
  techStackOptions,
  divisionOptions,
  regionOptions,
  jobGradeOptions,
  proposedActionOptions,
} from "../Options";
import ShortModal from "../../../../components/modal/ShortModal";
import { modifyPerson } from "../../../../api/PersonAPI";
import { getPersonById } from "../../../../api/PersonAPI";
import { getEmployeeByPersonID } from "../../../../api/EmployeeAPI";

const ModifyBillingForm = () => {

  const [showConfirmationModify, setShowConfirmationModify] =
    useState<boolean>(false);

  const [status, setStatus] = useState<string>("Billing");
  const [profilePic, setProfilePic] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<Gender | "Ninguno">("Ninguno");
  const [title, setTitle] = useState<string>("");
  const [techStack, setTechStack] = useState<TechStack | "Ninguno">("Ninguno");
  const [division, setDivision] = useState<Division | "Ninguno">("Ninguno");
  const [region, setRegion] = useState<Region | "Ninguno">("Ninguno");
  const [jobGrade, setJobGrade] = useState<JobGrade | "Ninguno">("Ninguno");
  const [expectedSalary, setExpectedSalary] = useState<number>(0);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [reasonBench, setReasonBench] = useState<string>("");
  const [proposedAction, setProposedAction] = useState<ProposedAction | "Ninguno">("Ninguno");
  const [projectIds, setProjectIds] = useState<{ id: string; name: string }[]>(  []);
  const [selectedProjectId, selectedSetProjectId] = useState<string>("");
  const [jobPositionIds, setJobPositionIds] = useState<{ id: string; name: string }[]>([]);
  const [selectedJobPositionId, selectedSetJobPositionId] = useState<string>("");
  const [salary, setSalary] = useState<number>(0);
  const [employee_status, setEmployeeStatus] = useState<EmployeeStatus | "Ninguno">("Ninguno");

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [modal, setModal] = useState<boolean>(false);  
  const toggleModal = (_prev: boolean) => { setModal((prev) => !prev); };

  

  useEffect(() => {
    if (id) {
      getPersonById(Number(id)).then((data) => {
        if(!data) {
          return;
        }
          setName(data.name);
          setPhoneNumber(data.phone);
          setEmail(data.email);
          setTitle(data.title);
          setStatus("Billing");
          setTechStack(data.tech_stack);
          setDivision(data.division);
          setRegion(data.region);
          setGender(data.gender);
          setExpectedSalary(data.expected_salary);
          getEmployeeByPersonID(Number(id)).then((employee) => {
            if(!employee) {
              return;
            }
          setSalary(employee.salary);
          setJobGrade(employee.job_grade);
          setProposedAction(employee.proposed_action);
          setEmployeeStatus(employee.employee_status);
          setReasonBench(employee.employee_reason);
          });
    });
  }
  }, [id]);

  useEffect(() => {
    getProjectNamesAndIds().then((data) => setProjectIds(data));
    getPositionNamesAndIds().then((data) => setJobPositionIds(data));
  }, []);

  const handleModifyPerson = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const candidateToSubmit: CreatePersonAttributes = {
      name: name,
      phone: phoneNumber,
      email: email,
      title: title,
      tech_stack: techStack,
      division: division,
      region: region,
      gender: gender,
      expected_salary: expectedSalary,
      status: status,
      salary: salary,
      job_grade: jobGrade,
      proposed_action: proposedAction,
      employee_status: employee_status,
      employee_reason: reasonBench,
    };
    const id_num = Number(id);
    console.log(JSON.stringify(candidateToSubmit));

    modifyPerson(id_num, candidateToSubmit)
      .then(() => {
        setShowConfirmationModify(false);
        console.log("Person submitted successfully");
        navigate("/resource/people");
      })
      .catch((error) => {
        console.error("Error modifying person:", error);
      });
  };

  return (
    <>
      <Form className="form-group-person" onSubmit={handleModifyPerson}>
        <div className="top-form">
          <div className="leftside-top-form">
            <Form.Group className="mb-3 personal-image">
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
          <Form.Group as={Row} className="mb-2 row-width-form">
            <Form.Label column sm={5} bsPrefix="label-style text-start">
              Título de Trabajo
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                type="text"
                placeholder="Introduzca su Título de Trabajo"
                value={title}
                bsPrefix="encora-purple-input form-control"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-2 row-width-form">
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

          <Form.Group as={Row} className="mb-2 row-width-form">
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

          <Form.Group as={Row} className="mb-2 row-width-form">
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

          <Form.Group as={Row} className="mb-2 row-width-form">
            <Form.Label column sm={5} bsPrefix="label-style text-start">
              Job Grade
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                as="select"
                value={jobGrade}
                bsPrefix="encora-purple-input form-control"
                onChange={(e) => setJobGrade(e.target.value as JobGrade)}
              >
                <option selected>Ninguno</option>
                {jobGradeOptions.map((jobGradeOption) => (
                  <option key={jobGradeOption} value={jobGradeOption}>
                    {jobGradeOption}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-2 row-width-form">
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

          <Form.Group as={Row} className="mb-2 row-width-form">
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

          <Form.Group as={Row} className="mb-2 row-width-form">
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

          <Form.Group as={Row} className="mb-2 row-width-form">
            <Form.Label column sm={5} bsPrefix="label-style text-start">
              Razón de Bench
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                type="text"
                placeholder="Introduzca su razón de bench"
                value={reasonBench}
                bsPrefix="encora-purple-input form-control"
                onChange={(e) => setReasonBench(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-2 row-width-form">
            <Form.Label column sm={5} bsPrefix="label-style text-start">
              Acción Propuesta
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                as="select"
                value={proposedAction}
                bsPrefix="encora-purple-input form-control"
                onChange={(e) =>
                  setProposedAction(e.target.value as ProposedAction)
                }
              >
                <option selected>Ninguno</option>
                {Object.keys(proposedActionOptions).map(
                  (proposedActionOption) => (
                    <option
                      key={proposedActionOption}
                      value={proposedActionOption}
                    >
                      {
                        proposedActionOptions[
                          proposedActionOption as ProposedAction
                        ]
                      }
                    </option>
                  )
                )}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-2 row-width-form">
            <Form.Label column sm={5} bsPrefix="label-style text-start">
              Proyecto
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                as="select"
                value={selectedProjectId}
                onChange={(e) => selectedSetProjectId(e.target.value)}
              >
                <option selected>Ninguno</option>
                {projectIds.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-2 row-width-form">
            <Form.Label column sm={5} bsPrefix="label-style text-start">
              Posición
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                as="select"
                value={selectedJobPositionId}
                onChange={(e) => selectedSetJobPositionId(e.target.value)}
              >
                <option selected>Ninguno</option>
                {jobPositionIds.map((jobPosition) => (
                  <option key={jobPosition.id} value={jobPosition.id}>
                    {jobPosition.name}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>
        </div>

        <div className="button-wrapper">

          <button
            type="button"
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
            Cambiar Estado
          </button>

          <button 
          type="submit" 
          className="btn btn-primary encora-purple-button"
          onClick={() => setShowConfirmationModify(true)}>
            Modificar
          </button>

          {showConfirmationModify && (
            <ShortModal
              typeOfModal="modify"
              btnArray={[
                <button key="modify" type="submit" className="btn btn-warning">
                  Modificar
                </button>,
              ]}
              onClose={() => setShowConfirmationModify(false)}
            />
          )

          }

        </div>
      </Form>
      {modal && (
        <ShortModal
          typeOfModal="state"
          setActiveModal={toggleModal}
        />
      )}
    </>
  );
};

export default ModifyBillingForm;
