import "../../../login/LoginPage.css";
import { EntityFormType } from "../../../../components/modal/modalType";  
import { getBtnArrLargeModal, getBtnArrShortModal } from "../../../../components/modal/getArrayButtons";
import LargeModal from "../../../../components/modal/LargeModal";
import ShortModal from "../../../../components/modal/ShortModal";
import { useLargeModal } from "../../../../hooks/useLargeModal";
import { useShortModal } from "../../../../hooks/useShortModal";

/**
 * EntityForm
 * Esta es la forma general para implementar un modal dentro de tu página.
 * 
 * @remarks
 * Este objeto será pasado como argumento a un custom hook que establecerá el tipo de modal.
 * Para alguien que solo quiere implementar un modal, favor de abstenerse solo en este nivel de abstracción.
 * Abajo de la documentación hay una implementación de una entidad Cliente llamada postulatePipelineForm.
 * 
 * @param entity - El nombre de la entidad
 * @param formStructure - El contenido del formulario. Está compuesto por una lista de objetos (grupos del formulario)
 *    @param inputType - El tipo de input que el formulario está compuesto (text, file, checkbox, select, date)
 *    @param canBeModified - Implica si el input puede modificarse y/o registrarse. En caso de ser true, el input se deshabilita.
 *    @param whichInputCanDisabled - Representa los inputs que pueden deshabilitarse cuando el checkbox se activa. Se puede 
 *           interpretar como  una lista de indíces (index) de los grupos del formulario.
 * 
**/

const postulatePipelineForm: EntityFormType = {
  entity: "Persona - Pipeline",
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
  }
};

const InfoPostulatePipeline = () => {
  const { shortModalProps, typeOfShortModal, setTypeOfShortModal }  = useShortModal(postulatePipelineForm);
  const { largeModalProps, typeOfLargeModal, setTypeOfLargeModal } = useLargeModal(postulatePipelineForm);

  return (
    <div>
      <button
        type="submit"
        className="bi bi-info-circle-fill"
        onClick={() => setTypeOfLargeModal("info")}
      >
      </button>
      {typeOfLargeModal && largeModalProps && <LargeModal {...largeModalProps} btnArray={getBtnArrLargeModal(typeOfLargeModal, setTypeOfShortModal)}/>}
      {typeOfShortModal && shortModalProps && <ShortModal {...shortModalProps} btnArray={getBtnArrShortModal(postulatePipelineForm.entity, typeOfShortModal)}/>}
    </div>
  );
};

export default InfoPostulatePipeline;