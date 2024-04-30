import LargeModal from "../../../components/modal/LargeModal.tsx";
import ClientModifyForm from "../../../components/accountModals/ClientModifyForm.tsx.tsx";
import ClientReadForm from "../../../components/accountModals/ClientReadForm.tsx";

interface Props {
  modalType: string;
}

const ClientWrapper = (props: Props) => {
  return (
    <>
      {props.modalType === "read" ? (
        <LargeModal
          titleModal="Información de Cliente"
          formContent={<ClientReadForm />}
        />
      ) : props.modalType === "modify" ? (
        <LargeModal
          titleModal="Modificar Cliente"
          formContent={<ClientModifyForm />}
        />
      ) : null}
    </>
  );
};

export default ClientWrapper;
