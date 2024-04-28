import "./People.css";
import TablePipeline from "../../../components/table/TablePipeline";
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import PeopleModal from "./PersonModalExample";
import { getAllPeople } from "../../../api/PersonAPI";
import { getAllCandidates } from "../../../api/CandidateAPI";

const pipeline_structure = {
    person_id: "Nombre",
    title: "Titulo de trabajo",
    tech_stack: "Tech Stack",
    expected_salary: "Salario Esperado",
};


interface PropTab {
  selected: string;
  setSelected: (selected: string) => void;
}

const TabNav = (props: PropTab) => {
  const personTypeList = [
    "Pipeline",
    "Bench",
    "Billing",
  ];

  return (
    <ul className="nav nav-pills nav-fill">
      {personTypeList.map((type: string, index: number) => (
        <li key={index} className="nav-item">
          <a
            key={index}
            className={`nav-link ${props.selected === type ? "encora-purple active text-light" : "text-body"}`}
            onClick={() => props.setSelected(type)}
          >
            {type}
          </a>
        </li>
      ))}
    </ul>
  );
};

const PersonsPage = () => {
    const [people, setPeople] = useState<Person[]>([]);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [selected, setSelected] = useState<string>("Pipeline");
    const [registerPerson, setRegisterPerson] = useState<boolean>(false);
    const location = useLocation();

    const toggleRegisterPerson = () => {
    setRegisterPerson((prev) => !prev);
    };

    useEffect(() => {
    !registerPerson &&
        getAllPeople().then((data: Person[] | undefined) =>
        setPeople(data || [])
        );
    }, [registerPerson, location]);

    useEffect(() => {
    !registerPerson &&
        getAllCandidates().then((data: Candidate[] | undefined) =>
        setCandidates(data || [])
        );
    }, [registerPerson, location]);

    return (
    <div className="project-page">
        <TabNav selected={selected} setSelected={setSelected} />
        <div className="project-header">
        <div className="project-header-title">
            <h1>Personas</h1>
        </div>

        <Outlet />
        {selected === "Pipeline" ? (
            <div className="project-register-wrapper"></div>
        ) : (
            ""
        )}
        </div>
        <div className="project-table">
        {people && (
            <TablePipeline entity={candidates} categories={pipeline_structure}>
            <button
                className="project-register encora-purple-button text-light"
                onClick={toggleRegisterPerson}
            >
                {" "}
                Registrar Persona{" "}
            </button>
            </TablePipeline>
        )}
        </div>

        {registerPerson && (
        <PeopleModal
            isActive={registerPerson}
            setActiveModal={toggleRegisterPerson}
        />
        )}
    </div>
    );
};

export default PersonsPage;
