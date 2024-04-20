import { useState, useEffect } from "react";
import { LargeModalProps } from "../components/modal/modalType";
import { EntityFormType, LargeModalType } from "../components/modal/modalType";

const generateModalProps = (entityForm: EntityFormType, typeOfModal: LargeModalType, closeModal: () => void) => {
  return {
    titleModal: `${typeOfModal === "info" ? "Información de" : typeOfModal === "register" ? "Registrar" : "Modificar"} ${entityForm.entity}`,
    typeOfModal: typeOfModal,
    entityForm: entityForm,
    onClose: closeModal
  };
};

export const useLargeModal = (entityForm: EntityFormType) => {
  const [typeOfLargeModal, setTypeOfLargeModal] = useState<LargeModalType>(null);
  const [largeModalProps, setLargeModalProps] = useState<LargeModalProps>();

  const closeLargeModal = () => setTypeOfLargeModal(null);

  useEffect(() => {
    if (typeOfLargeModal) {
      setLargeModalProps(generateModalProps(entityForm, typeOfLargeModal, closeLargeModal));
    }
  }, [typeOfLargeModal]);

  return { largeModalProps, typeOfLargeModal, setTypeOfLargeModal };
};