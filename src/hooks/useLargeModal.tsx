import React, { useState, useEffect } from "react";
import { EntityFormType, LargeModalType, ShortModalType } from "../components/modal/modalType";
import LargeModal from "../components/modal/LargeModal";
import ShowShortModalButton from "../components/buttons/ShowShortModalButton";

const renderLargeModal = (typeOfModal: LargeModalType, closeModal: () => void, setTypeOfShortModal: (value: React.SetStateAction<ShortModalType>) => void, entityForm: EntityFormType) => {
  switch (typeOfModal) {
    case "info":
      return (
        <LargeModal
          titleModal={`Información de ${entityForm.entity}`}
          typeOfModal={typeOfModal}
          entityForm={entityForm}
          onClose={closeModal}
        />
      );
    case "register":
      const registerButtonArray = [
        <ShowShortModalButton
          typeOfModalButton={"register"}
          setTypeOfModal={setTypeOfShortModal}
        />,
      ];
      return (
        <LargeModal
          titleModal={`Registrar ${entityForm.entity}`}
          btnArray={registerButtonArray}
          typeOfModal={typeOfModal}
          entityForm={entityForm}
          onClose={closeModal}
        />
      );
    case "modify":
      const modifyButtonArray = [
        <ShowShortModalButton
          typeOfModalButton={"modify"}
          setTypeOfModal={setTypeOfShortModal}
        />,
        <ShowShortModalButton
          typeOfModalButton={"delete"}
          setTypeOfModal={setTypeOfShortModal}
        />,
      ];
      return (
        <LargeModal
          titleModal={`Modificar ${entityForm.entity}`}
          btnArray={modifyButtonArray}
          typeOfModal={typeOfModal}
          entityForm={entityForm}
          onClose={closeModal}
        />
      );
    default:
      break;
  }
};

export const useLargeModal = (entityForm: EntityFormType, setTypeOfShortModal: (value: React.SetStateAction<ShortModalType>) => void) => {
  const [typeOfLargeModal, setTypeOfLargeModal] = useState<LargeModalType>(null);
  const [largeModalContent, setLargeModalContent] = useState<React.ReactNode | null>(null);

  const closeLargeModal = () => setTypeOfLargeModal(null);

  useEffect(() => {
    setLargeModalContent(renderLargeModal(typeOfLargeModal, closeLargeModal, setTypeOfShortModal, entityForm));
  }, [typeOfLargeModal]);

  return { largeModalContent, setTypeOfLargeModal,  };
};