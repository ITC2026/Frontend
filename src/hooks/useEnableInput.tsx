import { useState, useEffect } from "react";

export const useEnableInput = () => {
  const [enableInput, setEnableInput] = useState<Number[] | undefined>([-1]);

  useEffect(() => {
    setEnableInput(enableInput);
  }, [enableInput]);

  return {enableInput, setEnableInput};
};

