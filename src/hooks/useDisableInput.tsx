import { useState, useEffect } from "react";

export const useDisableInput = () => {
  const [disableInput, setDisableInput] = useState<Number[]>([-1]);

  useEffect(() => {
    setDisableInput(disableInput);
  }, [disableInput]);

  return {disableInput, setDisableInput};
};