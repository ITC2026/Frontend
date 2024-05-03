import LargeModal from "../../modal/LargeModal";
import OpeningForm from "./OpeningForm";
import { ReturnButtonBoolean } from "../../ReturnButton/ReturnButtonBoolean";

interface Props {
  onClose: (active: boolean) => void;
}
const OpeningRegisterModal = (prop: Props) => {
  return (
    <LargeModal
      titleModal="Registro de Vacantes"
      formContent={
        <OpeningForm type="Register" onClose={() => prop.onClose(false)} />
      }
      header={<ReturnButtonBoolean onClose={() => prop.onClose(false)} />}
    />
  );
};

export default OpeningRegisterModal;
