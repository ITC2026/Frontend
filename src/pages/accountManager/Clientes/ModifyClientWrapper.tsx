import LargeModal from "../../../components/modal/LargeModal";
import ClientModifyForm from "../../../components/accountModals/ClientModifyForm.tsx";

const ModifyClientWrapper = () => {
  return (
    <LargeModal titleModal="Modify Client" formContent={<ClientModifyForm />} />
  );
};

export default ModifyClientWrapper;
