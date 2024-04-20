import "../login/LoginPage.css";
import { EntityFormType } from "../../components/modal/modalType";
import { getBtnArrLargeModal, getBtnArrShortModal } from "../../components/modal/getArrayButtons";
import LargeModal from "../../components/modal/LargeModal";
import ShortModal from "../../components/modal/ShortModal";
import { useLargeModal } from "../../hooks/useLargeModal";
import { useShortModal } from "../../hooks/useShortModal";

/**
 * EntityForm
 * Esta es la forma general para implementar un modal dentro de tu página.
 * 
 * @remarks
 * Este objeto será pasado como argumento a un custom hook que establecerá el tipo de modal.
 * Para alguien que solo quiere implementar un modal, favor de abstenerse solo en este nivel de abstracción.
 * Abajo de la documentación hay una implementación de una entidad Cliente llamada ClientForm.
 * 
 * @param entity - El nombre de la entidad
 * @param formStructure - El contenido del formulario. Está compuesto por una lista de objetos (grupos del formulario)
 *    @param inputType - El tipo de input que el formulario está compuesto (text, file, checkbox, select, date)
 *    @param canBeModified - Implica si el input puede modificarse y/o registrarse. En caso de ser true, el input se deshabilita.
 *    @param whichInputCanDisabled - Representa los inputs que pueden deshabilitarse cuando el checkbox se activa. Se puede 
 *           interpretar como  una lista de indíces (index) de los grupos del formulario.
 * 
 * @example
 * Si quieres crear un formulario de un que tenga tanto su nombre, como su fecha de registro y una opción para deshabilitarlo, puedes hacer lo siguiente:
 * 
 * {
 *  entity: "Cliente"
 *  formStructure: {
 *    Nombre: {
 *      inputType: "text",
 *      canBeModified: true,
 *   }, 
 *   "Fecha de Registro": {
 *      inputType: "date",
 *      canBeModified: false,
 *   },
 *   "Deshabilitar Cliente": {
 *      inputType: "checkbox",
 *      canBeModified: true,
 *      whichInputCanDisabled: [0, 1]
 *   },
 *  }
 * }
 * 
 */

const clientForm: EntityFormType = {
  entity: "Cliente",
  formStructure: {
    "Nombre de Cliente": {
      inputType: "text",
      canBeModified: true,
    },
    Descripción: {
      inputType: "text",
      canBeModified: true,
    },
    Contrato: {
      inputType: "file",
      canBeModified: true,
    },
    Logo: {
      inputType: "file",
      canBeModified: true,
    },
    "High-Growth Client": {
      inputType: "checkbox",
      canBeModified: true,
      whichInputCanDisabled: [1, 3],
    },
    Division: {
      inputType: "select",
      canBeModified: true,
    },
    "ID del Cliente": {
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

const ModalPage = () => {
  const { shortModalProps, typeOfShortModal, setTypeOfShortModal }  = useShortModal(clientForm);
  const { largeModalProps, typeOfLargeModal, setTypeOfLargeModal } = useLargeModal(clientForm);

  return (
    <div>
      <button
        type="submit"
        className="btn btn-primary green"
        onClick={() => setTypeOfLargeModal("info")}
      >
        Info
      </button>
      <button
        type="submit"
        className="btn btn-primary blue"
        onClick={() => setTypeOfLargeModal("register")}
      >
        Registrar
      </button>
      <button
        type="submit"
        className="btn btn-primary gray"
        onClick={() => setTypeOfLargeModal("modify")}
      >
        Modificar
      </button>
      {typeOfLargeModal && largeModalProps && <LargeModal {...largeModalProps} btnArray={getBtnArrLargeModal(typeOfLargeModal, setTypeOfShortModal)}/>}
      {typeOfShortModal && shortModalProps && <ShortModal {...shortModalProps} btnArray={getBtnArrShortModal(clientForm.entity, typeOfShortModal)}/>}
    </div>
  );
};

export default ModalPage;