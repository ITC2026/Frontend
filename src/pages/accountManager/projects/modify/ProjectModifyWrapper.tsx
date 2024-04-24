import LargeModal from "../../../../components/modal/LargeModal";
import ProjectModifyForm from "./ProjectModifyForm";

const ProjectModifyWrapper = () => {
  return (
    <LargeModal
      titleModal="Modify Project"
      formContent={<ProjectModifyForm />}
    />
  );
};

export default ProjectModifyWrapper;
