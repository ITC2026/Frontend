import LargeModal from "../../../components/modal/LargeModal";
import PersonInfo from "./PersonInfo";

const ProjectInfoWrapper = () => {
  return (
    <div className="project-info-wrapper">
      <LargeModal titleModal="Person Info" formContent={<PersonInfo />} />
    </div>
  );
};

export default ProjectInfoWrapper;