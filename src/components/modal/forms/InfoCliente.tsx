import "../style/LargeModal.css"
import GenericFormGroup from "../GenericFormGroup";
import CheckboxFormGroup from "../CheckboxFormGroup";
import Form from "react-bootstrap/Form";

interface Props {
  onClose: () => void;
}

const InfoClienteForm = ({ onClose }: Props) => {
  return (
    <Form className="form-group">
      <GenericFormGroup
        nameLabel="Nombre de Cliente"
        disableInput={true}
        inputType="text"
      />
      <GenericFormGroup
        nameLabel="Descripción"
        disableInput={true}
        inputType="text"
      />
      <GenericFormGroup
        nameLabel="Contrato"
        disableInput={true}
        inputType="file"
      />
      <GenericFormGroup
        nameLabel="Logo"
        disableInput={true}
        inputType="file"
      />
      <CheckboxFormGroup
        nameLabel="High-Growth Client"
        disableInput={true}
      />
      <GenericFormGroup
        nameLabel="Division"
        disableInput={true}
        inputType="select"
      />
      <GenericFormGroup
        nameLabel="ID del Cliente"
        disableInput={true}
        inputType="select"
      />
      <GenericFormGroup
        nameLabel="Fecha de Registro"
        disableInput={true}
        inputType="date"
      />
      <GenericFormGroup
        nameLabel="Ultima Actualización"
        disableInput={true}
        inputType="date"
      />
      <div className="button-wrapper">
        <button
          className="btn btn-primary gray-button"
          onClick={() => onClose()}
        >
          Cancelar
        </button>
      </div>
    </Form>
  );
}

export default InfoClienteForm;