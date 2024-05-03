import "./style/ShortModal.css";
import { ReactElement } from "react";

interface SmallModalProps {
  content: ReactElement;
  setActiveModal: (active: boolean) => void;
}

const SmallModal = ({ content, setActiveModal }: SmallModalProps) => {
  return (
    <div className={`overlay background-gray`}>
      <div className="short-modal white">
        {content}
      </div>
    </div>
  );
};

export default SmallModal;
