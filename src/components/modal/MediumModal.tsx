import "./style/MediumModal.css";
import { ReactElement } from "react";

interface MediumModalProps {
  content: ReactElement;
  setActiveModal?: (active: boolean) => void;
}

const MediumModal = ({ content, setActiveModal }: MediumModalProps) => {
  return (
    <div className={`overlay background-gray`}>
      <div className="medium-modal white">
        {content}
      </div>
    </div>
  );
};

export default MediumModal;
