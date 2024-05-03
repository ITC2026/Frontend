import "./style/Employee.css"
import { useState } from "react";
import LargeModal from "../../../components/modal/LargeModal";
import RegisterPipelineForm from "./registerForms/RegisterPipelineForm";
import RegisterBenchForm from "./registerForms/RegisterBenchForm";
import RegisterBillingForm from "./registerForms/RegisterBillingForm";
import ModifyPipelineForm from "./modifyForms/ModifyPipelineForm";
import ModifyBenchForm from "./modifyForms/ModifyBenchForm";
import ModifyBillingForm from "./modifyForms/ModifyBillingForm";
import InfoPipelineForm from "./infoForms/InfoPipelineForm";
import InfoBenchForm from "./infoForms/InfoBenchForm";
import InfoBillingForm from "./infoForms/InfoBillingForm";

type ModalState = {
  registerPipeline: boolean;
  registerBench: boolean;
  registerBilling: boolean;
  modifyPipeline: boolean;
  modifyBench: boolean;
  modifyBilling: boolean;
  infoPipeline: boolean;
  infoBench: boolean;
  infoBilling: boolean;
};

const EmployeePage = () => {
  const [modalState, setModalState] = useState<ModalState>({
    registerPipeline: false,
    registerBench: false,
    registerBilling: false,
    modifyPipeline: false,
    modifyBench: false,
    modifyBilling: false,
    infoPipeline: false,
    infoBench: false,
    infoBilling: false,
  });

  const toggleModal = (modalName: keyof ModalState) => {
    setModalState((prev) => ({ ...prev, [modalName]: !prev[modalName] }));
  };

  return (
    <div className="project-page">
      <h1>aaaa</h1>
      <button onClick={() => toggleModal('registerPipeline')}>Abrir Registrar en Pipeline</button>
      <button onClick={() => toggleModal('registerBench')}>Abrir Registrar en Bench</button>
      <button onClick={() => toggleModal('registerBilling')}>Abrir Registrar en Billing</button>
      <br />
      <button onClick={() => toggleModal('modifyPipeline')}>Abrir Modificar en Pipeline</button>
      <button onClick={() => toggleModal('modifyBench')}>Abrir Modificar en Bench</button>
      <button onClick={() => toggleModal('modifyBilling')}>Abrir Modificar en Billing</button>
      <br />
      <button onClick={() => toggleModal('infoPipeline')}>Abrir Info en Pipeline</button>
      <button onClick={() => toggleModal('infoBench')}>Abrir Info en Bench</button>
      <button onClick={() => toggleModal('infoBilling')}>Abrir Info en Billing</button>
      {modalState.registerPipeline && (
        <LargeModal
          titleModal=" Registrar Información de Candidato - Pipeline"
          formContent={<RegisterPipelineForm setActiveModal={() => toggleModal('registerPipeline')} />}
        />
      )}
      {modalState.registerBench && (
        <LargeModal
          titleModal=" Registrar Información de Empleado - Bench"
          formContent={<RegisterBenchForm setActiveModal={() => toggleModal('registerBench')} />}
        />
      )}
      {modalState.registerBilling && (
        <LargeModal
          titleModal=" Registrar Información de Empleado - Billing"
          formContent={<RegisterBillingForm setActiveModal={() => toggleModal('registerBilling')} />}
        />
      )}
      {modalState.modifyPipeline && (
        <LargeModal
          titleModal=" Modificar Información de Candidato - Pipeline"
          formContent={<ModifyPipelineForm setActiveModal={() => toggleModal('modifyPipeline')} />}
        />
      )}
      {modalState.modifyBench && (
        <LargeModal
          titleModal=" Modificar Información de Empleado - Bench"
          formContent={<ModifyBenchForm setActiveModal={() => toggleModal('modifyBench')} />}
        />
      )}
      {modalState.modifyBilling && (
        <LargeModal
          titleModal=" Modificar Información de Empleado - Billing"
          formContent={<ModifyBillingForm setActiveModal={() => toggleModal('modifyBilling')} />}
        />
      )}
      {modalState.infoPipeline && (
        <LargeModal
          titleModal=" Información de Candidato - Pipeline"
          formContent={<InfoPipelineForm setActiveModal={() => toggleModal('infoPipeline')} />}
        />
      )}
      {modalState.infoBench && (
        <LargeModal
          titleModal=" Información de Empleado - Bench"
          formContent={<InfoBenchForm setActiveModal={() => toggleModal('infoBench')} />}
        />
      )}
      {modalState.infoBilling && (
        <LargeModal
          titleModal=" Información de Empleado - Billing"
          formContent={<InfoBillingForm setActiveModal={() => toggleModal('infoBilling')} />}
        />
      )}
    </div>
  );
};

export default EmployeePage;