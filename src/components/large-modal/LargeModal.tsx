import "./LargeModal.css";
import "../../index.css"
import { useState, useEffect } from "react";

interface Props {
  
  titleModal: string;
  btnArr?: React.ReactNode[];
  typeOfModal: string;
  children?: React.ReactNode;
}

const LargeModal = (props: Props) => {
  return (
    <div className="overlay background-gray">
      <div className="large-modal white">
        <h1>{props.titleModal}</h1>
        <div className="modal-content">
          {props.children}
        </div>
        
        <div className="button-wrapper">
          {props.btnArr && props.btnArr.map((btn) => btn)}
          <button 
            type="submit" 
            className={"btn btn-primary " + (props.typeOfModal === "Info" ? "encora-purple-button" : "gray-button")}
          >
            {props.typeOfModal === "Info" ? "Finalizar" : "Cancelar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LargeModal;