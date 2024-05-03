import "../style/profilePic.css";
import ProfilePicPlaceholder from "../../../../assets/profilepic_placeholder.png";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useEffect, useState } from "react";
import {
  genderOptions,
} from "../Options";
import { modifyPerson } from "../../../../api/PersonAPI";
import { useNavigate , useParams} from "react-router";
import { getPersonById } from "../../../../api/PersonAPI";
import ShortModal from "../../../../components/modal/ShortModal";


const MovePipelineToBench = () => {

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
  const [reasonBench, setReasonBench] = useState<StatusReason | "Ninguno">("Ninguno");
  const [proposedAction, setProposedAction] = useState<ProposedAction | "Ninguno">("Ninguno");
  const [, setEmployeeStatus] = useState<string>("");
  const [,setSalary] = useState<string>("");
  const [, setStatus] = useState<string>("");
  const [movementReason, setMovementReason] = useState<string>("");

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [modal, setModal] = useState<boolean>(false);  
  const toggleModal = (_prev: boolean) => { setModal((prev) => !prev); };


  const general_status = "Bench";
  const salary: number = 1111;
  const employee_status = "On Hired";

  const [showConfirmationModify, setShowConfirmationModify] = useState<boolean>(false);

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
        setStatus("Bench")
        setTechStack(data.tech_stack);
        setDivision(data.division);
        setRegion(data.region);
        setGender(data.gender);
        setExpectedSalary(data.expected_salary);
        setSalary(salary.toString());
        setJobGrade(jobGrade);
        setProposedAction(proposedAction);
        setEmployeeStatus(employee_status);
        setReasonBench(reasonBench);
        setMovementReason(movementReason);
      });
    }
  },[id]);


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
      status: general_status,
      salary: salary,
      job_grade: jobGrade,
      proposed_action: proposedAction,
      employee_status: employee_status,
      employee_reason: reasonBench,
    };
    const id_num = Number(id);

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
                disabled
                type="text"
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
                disabled
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
              disabled
              type="text"
              placeholder="Introduzca su Título de Trabajo"
              value={title}
              bsPrefix="encora-purple-input form-control"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
        </Form.Group>

        {/* Other Form Groups Here... */}

      </div>

      <div className="button-wrapper">
        <button type="submit" className="btn btn-primary encora-purple-button" onClick={() => setShowConfirmationModify(true)}>
          Cambiar Estado
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
        )}

        <button
          className="btn btn-primary gray-button"
          onClick={() => navigate("/resource/people")}
        >
          Cancelar
        </button>
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

export default MovePipelineToBench;
