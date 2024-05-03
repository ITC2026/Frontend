/* eslint-disable @typescript-eslint/ban-types */
import "../employees/style/Employee.css"

import RegisterPipelineForm from "../employees/registerForms/RegisterPipelineForm";
import RegisterBenchForm from "../employees/registerForms/RegisterBenchForm";
import RegisterBillingForm from "../employees/registerForms/RegisterBillingForm";

import LargeModal from "../../../components/modal/LargeModal";

interface Props {
  personId?: string;
  currentTable: string;
  setActiveModal: (active: boolean) => void;
}
const PeopleModal = (prop: Props) => {
  if (prop.currentTable === "Pipeline") {
    return (
      <LargeModal
        titleModal="Registrar en Pipeline"
        formContent={<RegisterPipelineForm setActiveModal={prop.setActiveModal} />}
      />
    );
  } else if (prop.currentTable === "Bench") {
    return (
      <LargeModal
        titleModal="Registrar en Bench"
        formContent={<RegisterBenchForm setActiveModal={prop.setActiveModal} />}
      />
    );
  } else if (prop.currentTable === "Billing") {
    return (
      <LargeModal
        titleModal="Registrar en Billing"
        formContent={<RegisterBillingForm setActiveModal={prop.setActiveModal} />}
      />
    );
  } else {
  return (
    <LargeModal
      titleModal="Registrar en Pipeline"
      formContent={<RegisterPipelineForm setActiveModal={prop.setActiveModal} />}
    />
  );
};
}

export default PeopleModal;
