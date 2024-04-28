/* eslint-disable no-case-declarations */
import React from "react";
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
        <h1>{titleModal}</h1>
        {formContent}
      </div>
    </div>
  );
};

export default LargeModal;
