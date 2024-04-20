import { useState, useEffect } from "react";
import { EntityFormType, ShortModalProps, ShortModalType } from "../components/modal/modalType";

const generateModalProps = (entityForm: EntityFormType, typeOfModal: ShortModalType, closeModal: () => void) => {
  return {
    typeOfModal: typeOfModal,
    entityForm: entityForm,
    onClose: closeModal
  };
};

export const useShortModal = (entityForm: EntityFormType) => {
  const [typeOfShortModal, setTypeOfShortModal] = useState<ShortModalType>(null);
  const [shortModalProps, setShortModalProps] = useState<ShortModalProps>();

  const closeShortModal = () => setTypeOfShortModal(null);

  useEffect(() => {
    if (typeOfShortModal) {
      setShortModalProps(generateModalProps(entityForm, typeOfShortModal, closeShortModal));
    }
  }, [typeOfShortModal]);

  return { shortModalProps, typeOfShortModal, setTypeOfShortModal };
};