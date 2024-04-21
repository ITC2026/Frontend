import { useState } from "react";
import LargeModal from "../../components/modal/LargeModal";
import ShortModal from "../../components/modal/ShortModal";
import RegistrarClienteForm from "../../components/modal/forms/RegistrarCliente";
import ModificarClienteForm from "../../components/modal/forms/ModificarCliente";
import InfoClienteForm from "../../components/modal/forms/InfoCliente";
import { getBtnArrLargeModal } from "../../components/modal/getButtonArray";
import { getBtnArrShortModal } from "../../components/modal/getButtonArray";
import { LargeModalType } from "../../components/modal/modalType";
import { ShortModalType } from "../../components/modal/modalType";

const ModalPage = () => {
  const [typeOfLargeModal, setTypeOfLargeModal] = useState<LargeModalType>("close")
  const [typeOfShortModal, setTypeOfShortModal] = useState<ShortModalType>("close")

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

      {typeOfLargeModal === "register" && (
        <LargeModal
          titleModal="Registrar Cliente"
          typeOfModal={typeOfLargeModal}
          btnArray={getBtnArrLargeModal(typeOfLargeModal, setTypeOfShortModal)}
          formContent={<RegistrarClienteForm />}
          onClose={() => setTypeOfLargeModal("close")}
        />
      )}
      {typeOfLargeModal === "modify" && (
        <LargeModal
          titleModal="Modificar Cliente"
          typeOfModal={typeOfLargeModal}
          btnArray={getBtnArrLargeModal(typeOfLargeModal, setTypeOfShortModal)}
          formContent={<ModificarClienteForm />}
          onClose={() => setTypeOfLargeModal("close")}
        />
      )}
      {typeOfLargeModal === "info" && (
        <LargeModal
          titleModal="Información de Cliente"
          typeOfModal={typeOfLargeModal}
          btnArray={getBtnArrLargeModal(typeOfLargeModal, setTypeOfShortModal)}
          formContent={<InfoClienteForm />}
          onClose={() => setTypeOfLargeModal("close")}
        />
      )}
      {typeOfShortModal !== "close" && (
        <ShortModal
          typeOfModal={typeOfShortModal}
          btnArray={getBtnArrShortModal(typeOfShortModal)}
          onClose={() => setTypeOfShortModal("close")}
        />
      )}
    </div>
  );
};

export default ModalPage;