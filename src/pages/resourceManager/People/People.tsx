import "./People.css";
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router";

import PeopleModal from "./RegisterPerson";

import { getAllPeople } from "../../../api/PersonAPI";

import TablePipeline from "../../../components/table/TablePipeline";
import TableBench from "../../../components/table/TableBench";
import TableBilling from "../../../components/table/TableBilling";

const pipeline_structure = {
  person_id: "Nombre",
  title: "Titulo de trabajo",
  tech_stack: "Tech Stack",
  expected_salary: "Salario Esperado",
};

const bench_structure = {
  person_id: "Nombre",
  division: "División",
  title: "Titulo de trabajo",
  tech_stack: "Tech Stack",
  proposed_action: "Acción Propuesta",
  days_on_bench: "Días en el bench",
};

const billing_structure = {
  person_id: "Nombre",
  division: "División",
  client_id: "Cliente",
  title: "Titulo de trabajo",
  project_id: "Proyecto",
  billing_rate: "Billing Rate",
  salary: "Salario",
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
    if (!registerPerson) {
      getAllPeople().then((data: Person[] | undefined) =>
        setPeople(data || [])
      );
    }
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

  const handleTableChange = (type: string) => {
    setSelected(type);
  };

  const renderTable = () => {
    switch (selected) {
      case "Pipeline":
        return (
          <TablePipeline
            entity={filteredPeople}
            categories={pipeline_structure}
          >
            <button
              className="project-register encora-purple-button text-light"
              onClick={toggleRegisterPerson}
            >
              Registrar en Pipeline
            </button>
          </TablePipeline>
        );
      case "Bench":
        return (
          <TableBench entity={filteredPeople} categories={bench_structure}>
            <button
              className="project-register encora-purple-button text-light"
              onClick={toggleRegisterPerson}
            >
              Registrar en Bench
            </button>
          </TableBench>
        );
      case "Billing":
        return (
          <TableBilling entity={filteredPeople} categories={billing_structure}>
            <button
              className="project-register encora-purple-button text-light"
              onClick={toggleRegisterPerson}
            >
              Registrar en Billing
            </button>
          </TableBilling>
        );
      default:
        return null;
    }
  };

  return (
    <div className="project-page">
      <div className="ajuste">
      <ul className="nav nav-pills nav-fill">
        {["Pipeline", "Bench", "Billing"].map((type: string, index: number) => (
          <li key={index} className="nav-item">
            <a
              className={`nav-link ${
                selected === type
                  ? "encora-purple active text-light"
                  : "text-body"
              }`}
              onClick={() => handleTableChange(type)}
            >
              {type}
            </a>
          </li>
        ))}
      </ul>
      </div>
      <div className="project-header">
        <div className="project-header-title">
          <h1>Personas</h1>
        </div>
        <Outlet />
        {selected === "Pipeline" && <div className=""></div>}
        {selected === "Bench" && (
          <div className="project-register-wrapper"></div>
        )}
        {selected === "Billing" && (
          <div className="project-register-wrapper"></div>
        )}
      </div>
      <div className="project-table">{renderTable()}</div>
      {registerPerson && (
        <PeopleModal
          currentTable={selected}
          setActiveModal={toggleRegisterPerson}
        />
      )}
    </div>
  );
};

export default PersonsPage;
