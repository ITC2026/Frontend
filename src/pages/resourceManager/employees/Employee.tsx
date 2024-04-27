import "./Employee.css";
import { useState } from "react";
import LargeModal from "../../../components/modal/LargeModal";
import RegisterPipelineForm from "./registerForms/RegisterPipelineForm";
import RegisterBenchForm from "./registerForms/RegisterBenchForm";
import RegisterBillingForm from "./registerForms/RegisterBillingForm";

const EmployeePage = () => {
  const [registerPipeline, setRegisterPipeline] = useState<boolean>(false);
  const [registerBench, setRegisterBench] = useState<boolean>(false);
  const [registerBilling, setRegisterBilling] = useState<boolean>(false);

  const toggleRegisterPipeline = () => {
    setRegisterPipeline((prev) => !prev);
  };

  const toggleRegisterBench = () => {
    setRegisterBench((prev) => !prev);
  };

  const toggleRegisterBilling = () => {
    setRegisterBilling((prev) => !prev);
  };

  return (
    <div className="project-page">
      <h1>aaaa</h1>
      <button onClick={toggleRegisterPipeline}>
        Abrir Registrar en Pipeline
      </button>
      <button onClick={toggleRegisterBench}>Abrir Registrar en Bench</button>
      <button onClick={toggleRegisterBilling}>
        Abrir Registrar en Billing
      </button>
      {registerPipeline && (
        <LargeModal
          titleModal=" Registrar Información de Persona - Pipeline"
          formContent={<RegisterPipelineForm setActiveModal={setRegisterPipeline} />}
        />
      )}
      {registerBench && (
        <LargeModal
          titleModal=" Registrar Información de Persona - Bench"
          formContent={<RegisterBenchForm setActiveModal={setRegisterBench} />}
        />
      )}
      {registerBilling && (
        <LargeModal
          titleModal=" Registrar Información de Persona - Billing"
          formContent={<RegisterBillingForm setActiveModal={setRegisterBilling} />}
        />
      )}
    </div>
  );
};

export default EmployeePage;
