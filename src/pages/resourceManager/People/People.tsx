import "./People.css";
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import PeopleModal from "./PersonModalExample";
import { getAllPeople } from "../../../api/PersonAPI";
import { getAllCandidates } from "../../../api/CandidateAPI";
import { getAllEmployees } from "../../../api/EmployeeAPI";
import  getAllEmployeesOnHired  from "../../resourceManager/functions/getAllEmployeesOnHired";
import  getAllEmployeesNotOnHired  from "../../resourceManager/functions/getAllEmployeesNotOnHired";
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
days_on_bench: "Días en el bench"
}

const billing_structure = {
person_id: "Nombre",
division: "División",
client_id: "Cliente",
title: "Titulo de trabajo",
project_id: "Proyecto",
billing_rate: "Billing Rate",
salary: "Salario"
}


const PersonsPage = () => {
  const [, setPeople] = useState<Person[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeesNotOnHired, setEmployeesNotOnHired] = useState<Employee[]>([]);
  const [employeesOnHired, setEmployeesOnHired] = useState<Employee[]>([]);

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
      getAllCandidates().then((data: Candidate[] | undefined) =>
        setCandidates(data || [])
      );
      getAllEmployees().then((data: Employee[] | undefined) =>
        setEmployees(data || [])
      );
      getAllEmployeesNotOnHired().then((data: Employee[] | undefined) =>
        setEmployeesNotOnHired(data || [])
      );
      getAllEmployeesOnHired().then((data: Employee[] | undefined) =>
        setEmployeesOnHired(data || [])
      );
    }
  }, [registerPerson, location]);

  const handleTableChange = (type: string) => {
    setSelected(type);
  };

  const renderTable = () => {
    switch (selected) {
      case "Pipeline":
        return (
          <TablePipeline
            entity={candidates}
            categories={pipeline_structure}
          />
        );
      case "Bench":
        return (
          <TableBench
            entity={employeesNotOnHired}
            categories={bench_structure}
          />
        );
      case "Billing":
        return (
          <TableBilling
            entity={employeesOnHired} // Assuming employees data for billing
            categories={billing_structure}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="project-page">
      <ul className="nav nav-pills nav-fill">
        {["Pipeline", "Bench", "Billing"].map((type: string, index: number) => (
          <li key={index} className="nav-item">
            <a
              className={`nav-link ${selected === type ? "encora-purple active text-light" : "text-body"}`}
              onClick={() => handleTableChange(type)}
            >
              {type}
            </a>
          </li>
        ))}
      </ul>
      <div className="project-header">
        <div className="project-header-title">
          <h1>Personas</h1>
        </div>
        <Outlet />
        {selected === "Pipeline" && (
          <div className="project-register-wrapper">
            <button
              className="project-register encora-purple-button text-light"
              onClick={toggleRegisterPerson}
            >
              Registrar Persona
            </button>
          </div>
        )}
      </div>
      <div className="project-table">{renderTable()}</div>
      {registerPerson && (
        <PeopleModal isActive={registerPerson} setActiveModal={toggleRegisterPerson} />
      )}
    </div>
  );
};

export default PersonsPage;
