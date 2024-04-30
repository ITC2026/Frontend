import LargeModal from "../../../../components/modal/LargeModal";
import ProjectModifyForm from "./ProjectModifyForm";
import "./ProjectModifyWrapper.css";
const ProjectModifyWrapper = () => {
  return (
    <div className="project-modify-wrapper">
      <LargeModal
        titleModal="Modify Project"
        formContent={<ProjectModifyForm />}
      />
    </div>
  );
};

export default ProjectModifyWrapper;
