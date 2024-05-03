import JobPositionModifyForm from "../../../components/accountManager/job_positions/forms/modify/JobPositionModifyForm";
import LargeModal from "../../../components/modal/LargeModal";
import { ReturnButton } from "../../../components/ReturnButton/ReturnButton";
import { useEffect, useState } from "react";

interface Props {
  type: string;
  origin? : string; 
}

const JobPositionModify = (prop: Props) => {
  const [title, setTitle] = useState<string>(
    "Registro de Posiciones de Trabajo"
  );

  useEffect(() => {
    if (prop.type === "Info") {
      setTitle("Información de Posición");
    } else if (prop.type === "Modify") {
      setTitle("Modificar Posición");
    } else if (prop.type === "Register") {
      setTitle("Registro de Posiciones de Trabajo");
    }
  }, [prop.type]);

  return (
    <>
      <LargeModal
        titleModal={title}
        formContent={<JobPositionModifyForm type={prop.type} origin = {prop.origin}/>}
        header={<ReturnButton />}
      />
    </>
  );
};

export default JobPositionModify;
