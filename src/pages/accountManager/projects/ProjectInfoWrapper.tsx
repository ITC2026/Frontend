import LargeModal from "../../../components/modal/LargeModal";
import ProjectInfo from "./ProjectInfo";

const ProjectInfoWrapper = () => {
  return (
    <div className="project-info-wrapper">
      <LargeModal titleModal="Información del Proyecto" formContent={<ProjectInfo />} />
    </div>
  );
};

export default ProjectInfoWrapper;
