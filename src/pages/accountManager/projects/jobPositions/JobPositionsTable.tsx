import { useEffect, useState } from "react";
import { getAllPositions } from "../../../../api/PositionAPI";

export const TablePositions = () => {
  const [jobPositions, setJobPositions] = useState<Position[]>([]);
  useEffect(() => {
    getAllPositions().then((response) => {
      if (!response) {
        return;
      }
      setJobPositions(response.data);
    });
  }, []);
  return <div>Hola :D</div>;
};
