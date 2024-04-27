import "./Persons.css";
import TableView from "../../../components/table/Table";
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import ProjectModal from "../../accountManager/projects/ProjectModalExample";
import { getAllPeople } from "../../../api/PersonAPI";

const pipeline_structure = {
    name: "Nombre",
    job_title: "Titulo de trabajo",
    tech_stack: "Tech Stack",
    expected_salary: "Salario Esperado",
};


interface PropTab {
  selected: string;
  setSelected: (selected: string) => void;
}

const TabNav = (props: PropTab) => {
  const projectTypeList = [
    "Pipeline",
    "Bench",
    "Billing",
  ];

  return (
    <ul className="nav nav-pills nav-fill">
      {projectTypeList.map((type: string, index: number) => (
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

    const filteredPeople = people.filter((person) => {
    if (selected === "Pipeline") {
        return person.status === "Pipeline";
    } else if (selected === "Bench") {
        return person.status === "Bench";
    } else if (selected === "Billing") {
        return person.status === "Billing";
    }
    return true;
    });

    return (
    <div className="project-page">
        <TabNav selected={selected} setSelected={setSelected} />
        <div className="project-header">
        <div className="project-header-title">
            <h1>Proyectos</h1>
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
            <TableView entity={filteredPeople as Person[]} categories={pipeline_structure}>
            <button
                className="project-register encora-purple-button text-light"
                onClick={toggleRegisterPerson}
            >
                {" "}
                Registrar Persona{" "}
            </button>
            </TableView>
        )}
        </div>

        {registerPerson && (
        <ProjectModal
            isActive={registerPerson}
            setActiveModal={toggleRegisterPerson}
        />
        )}
    </div>
    );
};

export default PersonsPage;
