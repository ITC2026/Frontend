/* eslint-disable @typescript-eslint/ban-types */
import PersonForm from "./PersonForm";
import LargeModal from "../../../components/modal/LargeModal";

interface Props {
  projectId?: string;
  isActive: boolean;
  setActiveModal: (active: boolean) => void;
}
const ProjectModal = (prop: Props) => {
  return (
    <LargeModal
      titleModal="Register Person"
      formContent={<PersonForm setActiveModal={prop.setActiveModal} />}
    />
  );
};

export default ProjectModal;
