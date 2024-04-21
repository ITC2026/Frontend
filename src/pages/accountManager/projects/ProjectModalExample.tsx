/* eslint-disable @typescript-eslint/ban-types */
import Modal from "react-bootstrap/Modal";
import ProjectForm from "./ProjectForm";

interface Props {
  projectId?: string;
  isActive: boolean;
  setActiveModal: (active: boolean) => void;
}
const ProjectModal = (prop: Props) => {
  return (
    <Modal dialogClassName="modal-90w" show={prop.isActive}>
      <Modal.Header>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ProjectForm setActiveModal={prop.setActiveModal} />
      </Modal.Body>
    </Modal>
  );
};

export default ProjectModal;
