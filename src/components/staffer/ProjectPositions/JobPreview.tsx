import { useState, useEffect } from "react";
import { getOpeningsFromJobID } from "../../../utils/JobPositions/GetOpeningsFromJobID";
import "./style/JobPreview.css";

interface Props {
  position: Position;
  setId: (id: number) => void;
}

const JobPreview = (prop: Props) => {
  const [openingsLeft, setOpeningsLeft] = useState<number>(0);
  const [openingTotal, setOpeningTotal] = useState<number>(0);
  const position_id = prop.position.id;


  useEffect(() => {
    getOpeningsFromJobID(position_id).then((openings) => {
      if (!openings) {
        return;
      }
      setOpeningTotal(openings.length);
      const openingsLeft = openings.filter((opening) => opening === "Filled");
      setOpeningsLeft(openingsLeft.length);
    });
  }, [position_id]);

  return (
    <div className="job-preview" onClick={() => {
        prop.setId(prop.position.id);
    }}>
      <h3>{prop.position.position_title}</h3>
      <p>Openings</p>
      <p>
        {openingsLeft} / {openingTotal}
      </p>
      
    </div>
  );
};

export default JobPreview;
