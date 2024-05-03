import "./style/ShortModal.css";
import { ReactElement } from "react";

interface ShortModalProps {
  content: ReactElement;
  setActiveModal: (active: boolean) => void;
}

const ShortModal = ({ content, setActiveModal }: ShortModalProps) => {
  return (
    <div className={`overlay background-gray`}>
      <div className="short-modal white">
        {content}
      </div>
    </div>
  );
};

export default ShortModal;
