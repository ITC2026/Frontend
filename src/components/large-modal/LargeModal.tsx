import "./LargeModal.css";
import "../../index.css"
//import { useState, useEffect } from "react";

interface Props {
  titleModal: string;
  btnArr: React.ReactNode[];
}

const LargeModal = (props: Props) => {
  return (
    <div className="overlay background-gray">
      <div className="large-modal white">
        <h1>{props.titleModal}</h1>
        <div className="button-wrapper">
          {props.btnArr.map((btn) => btn)}
        </div>
      </div>
    </div>
  );
}

export default LargeModal;