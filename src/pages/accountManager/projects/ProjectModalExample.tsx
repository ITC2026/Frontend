/* eslint-disable @typescript-eslint/ban-types */
import ProjectForm from "./ProjectForm";
import LargeModal from "../../../components/modal/LargeModal";

interface Props {
  projectId?: string;
  isActive: boolean;
  setActiveModal: (active: boolean) => void;
}
const ProjectModal = (prop: Props) => {
  return (
    <LargeModal
      titleModal="Registrar Proyecto"
      formContent={<ProjectForm setActiveModal={prop.setActiveModal} />}
    />
  );
};

export default ProjectModal;
