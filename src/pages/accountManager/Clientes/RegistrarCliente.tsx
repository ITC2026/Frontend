import LargeModal from "../../../components/modal/LargeModal";
import ClientRegisterForm from "../../../components/accountModals/ClientRegisterForm";

interface Props {
  setActiveModal: (active: boolean) => void;
}

const RegistrarCliente = (props: Props) => {
  return (
    <LargeModal
      titleModal="Registrar Cliente"
      formContent={
        <ClientRegisterForm onClose={() => props.setActiveModal(false)} />
      }
    />
  );
};

export default RegistrarCliente;
