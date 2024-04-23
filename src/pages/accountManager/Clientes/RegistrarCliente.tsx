import LargeModal from "../../../components/modal/LargeModal";
import ClientRegisterForm from "../../../components/accountModals/ClientRegisterForm";
import NewClientRegisterForm from "../../../components/accountModals/NewClientRegisterForm";

interface Props {
  setActiveModal: (active: boolean) => void;
}

const RegistrarCliente = (props: Props) => {
  return (
    <LargeModal
      titleModal="Registrar Cliente"
      formContent={
        <NewClientRegisterForm setActiveModal={() => props.setActiveModal(false)} />
      }
    />
  );
};

export default RegistrarCliente;
