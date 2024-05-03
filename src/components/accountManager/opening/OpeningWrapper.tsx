import { useState, useEffect } from "react";
import LargeModal from "../../modal/LargeModal";
import OpeningForm from "./OpeningForm";
import { ReturnButton } from "../../ReturnButton/ReturnButton";
interface Props {
  type: string;
}

/**
 * Only used for modify and info openings
 * @param prop type of opening
 * @returns OpeningWrapper component
 * @constructor
 * @function OpeningWrapper
 * @export
 * @component
 */

const OpeningWrapper = (prop: Props) => {
  const [title, setTitle] = useState<string>("Registro de Vacantes");
  useEffect(() => {
    if (prop.type === "Info") {
      setTitle("Información de Vacantes");
    } else if (prop.type === "Modify") {
      setTitle("Modificar Vacantes");
    }
  }, [prop.type]);

  return (
    <LargeModal
      titleModal={title}
      formContent={<OpeningForm type={prop.type} />}
      header={<ReturnButton />}
    />
  );
};

export default OpeningWrapper;
