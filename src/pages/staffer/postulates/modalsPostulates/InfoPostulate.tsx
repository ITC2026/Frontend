import "../../../login/LoginPage.css";
import { EntityFormType } from "../../../../components/modal/modalType";
import { getBtnArrLargeModal, getBtnArrShortModal } from "../../../../components/modal/getArrayButtons";
import LargeModal from "../../../../components/modal/LargeModal";
import ShortModal from "../../../../components/modal/ShortModal";
import { useLargeModal } from "../../../../hooks/useLargeModal";
import { useShortModal } from "../../../../hooks/useShortModal";
import { useState } from "react";

const postulateForm: EntityFormType = {
    entity: "IT WORKS - Bench",
    formStructure: {
        "Nombre de Persona": {
            inputType: "text",
            canBeModified: false,
        },
        Gender: {
            inputType: "select",
            canBeModified: true,
        },
        "Título de Trabajo": {
            inputType: "text",
            canBeModified: true,
        },
        "Tech Stack": {
            inputType: "select",
            canBeModified: true,
        },
        División: {
            inputType: "select",
            canBeModified: true,
        },
        Región: {
            inputType: "select",
            canBeModified: true,
        },
        "Salario Esperado ($MXN)": {
            inputType: "text",
            canBeModified: false,
        },
        "Teléfono de Contacto": {
            inputType: "text",
            canBeModified: false,
        },
        "Correo de Contacto": {
            inputType: "text",
            canBeModified: false,
        },
        "ID del Candidato": {
            inputType: "text",
            canBeModified: false,
        },
        "Creado en": {
            inputType: "date",
            canBeModified: false,
        },
        "Última Actualización": {
            inputType: "date",
            canBeModified: false,
        },
        "Razón de Bench": {
            inputType: "text",
            canBeModified: true,
        },
        "Acción Propuesta": {
            inputType: "text",
            canBeModified: true,
        },
        "Cliente Actual": {
            inputType: "text",
            canBeModified: true,
        },
        "Cliente Anterior": {
            inputType: "text",
            canBeModified: true,
        },
        "Empleado Desde": {
            inputType: "date",
            canBeModified: true,
        },
        "Bench Desde": {
            inputType: "date",
            canBeModified: true,
        },
        "Días en Bench": {
            inputType: "text",
            canBeModified: true,
        },
        "Inicio del Contrato": {
            inputType: "date",
            canBeModified: true,
        },
    }
};

interface InfoPostulateProps {
    status?: string;
}

const InfoPostulate = (props : InfoPostulateProps) => {
    const { shortModalProps, typeOfShortModal, setTypeOfShortModal } = useShortModal(postulateForm);
    const { largeModalProps, typeOfLargeModal, setTypeOfLargeModal } = useLargeModal(postulateForm);
    const [status, setStatus] = useState<string>(props.status || "Bench");  // Default status is Bench]


    setTypeOfLargeModal("info");
    return (
        <div>
            {typeOfLargeModal && largeModalProps && <LargeModal {...largeModalProps} btnArray={getBtnArrLargeModal(typeOfLargeModal, setTypeOfShortModal)} />}
            {typeOfShortModal && shortModalProps && <ShortModal {...shortModalProps} btnArray={getBtnArrShortModal(postulateForm.entity, typeOfShortModal)} />}
        </div>
    );
};

export default InfoPostulate;