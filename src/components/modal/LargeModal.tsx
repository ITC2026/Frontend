/* eslint-disable no-case-declarations */
import React from "react";
import "../../index.css";
import "./style/LargeModal.css";

interface Props {
  titleModal: string;
  subtitleModal?: string;
  formContent: React.ReactElement;
  header?: React.ReactElement;
}

const LargeModal = ({
  titleModal,
  subtitleModal,
  formContent,
  header,
}: Props) => {
  return (
    <div className="overlay background-gray">
      <div className="large-modal white">
        <div className="modal-header">{header}</div>
        <h1>{titleModal}</h1>
        <h3>{subtitleModal}</h3>
        {formContent}
      </div>
    </div>
  );
};

export default LargeModal;
