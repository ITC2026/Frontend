import "../../index.css";
import "./style/LargeModal.css";

interface Props {
  titleModal: string;
  formContent: React.ReactElement;
}

const LargeModal = ({ titleModal, formContent}: Props) => {
  return (
    <div className="overlay background-gray">
      <div className="large-modal white">
        <h1 className="heading-form">{titleModal}</h1>
        {formContent}
      </div>
    </div>
  );
};

export default LargeModal;