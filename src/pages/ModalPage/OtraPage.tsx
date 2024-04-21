import "../login/LoginPage.css";
import { EntityFormType } from "../../components/modal/modalType";
import { getBtnArrLargeModal, getBtnArrShortModal } from "../../components/modal/getArrayButtons";
import LargeModal from "../../components/modal/LargeModal";
import ShortModal from "../../components/modal/ShortModal";
import { useLargeModal } from "../../hooks/useLargeModal";
import { useShortModal } from "../../hooks/useShortModal";

const ivanForm: EntityFormType = {
  entity: "Ivan",
  formStructure: {
    Ivan: {
      inputType: "text",
      canBeModified: true,
    },
    "Ivan muere": {
      inputType: "checkbox",
      canBeModified: true,
      whichInputCanDisabled: [0]
    },
    Medina: {
      inputType: "text",
      canBeModified: true,
    },
    "Medina muere": {
      inputType: "checkbox",
      canBeModified: true,
      whichInputCanDisabled: [2]
    },
    "Subir aaaaaa": {
      inputType: "file",
      canBeModified: true,
    }
  }
};

const OtraPage = () => {
  const { shortModalProps, typeOfShortModal, setTypeOfShortModal }  = useShortModal(ivanForm);
  const { largeModalProps, typeOfLargeModal, setTypeOfLargeModal } = useLargeModal(ivanForm);

  return (
    <div>
      <button
        type="submit"
        className="btn btn-primary green"
        onClick={() => setTypeOfLargeModal("info")}
      >
        Info
      </button>
      <button
        type="submit"
        className="btn btn-primary blue"
        onClick={() => setTypeOfLargeModal("register")}
      >
        Registrar
      </button>
      <button
        type="submit"
        className="btn btn-primary gray"
        onClick={() => setTypeOfLargeModal("modify")}
      >
        Modificar
      </button>
      {typeOfLargeModal && largeModalProps && <LargeModal {...largeModalProps} btnArray={getBtnArrLargeModal(typeOfLargeModal, setTypeOfShortModal)}/>}
      {typeOfShortModal && shortModalProps && <ShortModal {...shortModalProps} btnArray={getBtnArrShortModal(ivanForm.entity, typeOfShortModal)}/>}
    </div>
  );
};

export default OtraPage;