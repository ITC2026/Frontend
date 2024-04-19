import React, { useState, useEffect } from "react";
import { EntityFormType, ShortModalType } from "../components/modal/modalType";
import ShortModal from "../components/modal/ShortModal";
import RegisterButton from "../components/buttons/RegisterButton";
import ModifyButton from "../components/buttons/ModifyButton";
import DeleteButton from "../components/buttons/DeleteButton";

const renderShortModal = (typeOfModal: ShortModalType, closeModal: () => void, entityForm: EntityFormType) => {
  switch (typeOfModal) {
    case "register":
      return (
        <ShortModal
          btnArray={[<RegisterButton entityName={entityForm.entity} />]}
          typeOfModal={typeOfModal}
          entityForm={entityForm}
          onClose={closeModal}
        />
      );
    case "modify":
      return (
        <ShortModal
          btnArray={[<ModifyButton entityName={entityForm.entity} />]}
          typeOfModal={typeOfModal}
          entityForm={entityForm}
          onClose={closeModal}
        />
      );
    case "delete":
      return (
        <ShortModal
          btnArray={[<DeleteButton entityName={entityForm.entity} />]}
          typeOfModal={typeOfModal}
          entityForm={entityForm}
          onClose={closeModal}
        />
      );
    default:
      break;
  }
};

export const useShortModal = (entityForm: EntityFormType) => {
  const [typeOfShortModal, setTypeOfShortModal] = useState<ShortModalType>(null);
  const [shortModalContent, setShortModalContent] = useState<React.ReactNode | null>(null);

  const closeShortModal = () => setTypeOfShortModal(null);

  useEffect(() => {
    setShortModalContent(renderShortModal(typeOfShortModal, closeShortModal, entityForm));
  }, [typeOfShortModal]);

  return { setTypeOfShortModal, shortModalContent };
};