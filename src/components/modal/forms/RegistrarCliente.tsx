import "../style/LargeModal.css"
import GenericFormGroup from "../GenericFormGroup";
import CheckboxFormGroup from "../CheckboxFormGroup";
import Form from "react-bootstrap/Form";

interface Props {
  onClose: () => void;
}

const RegistrarClienteForm = ({ onClose }: Props) => {
  return (
    <Form className="form-group">
      <GenericFormGroup
        nameLabel="Nombre de Cliente"
        disableInput={false}
        inputType="text"
      />
      <GenericFormGroup
        nameLabel="Descripción"
        disableInput={false}
        inputType="text"
      />
      <GenericFormGroup
        nameLabel="Contrato"
        disableInput={false}
        inputType="file"
      />
      <GenericFormGroup
        nameLabel="Logo"
        disableInput={false}
        inputType="file"
      />
      <CheckboxFormGroup
        nameLabel="High-Growth Client"
        disableInput={false}
      />
      <GenericFormGroup
        nameLabel="Division"
        disableInput={false}
        inputType="select"
      />
      <div className="button-wrapper">
        <button
          type="submit"
          className="btn btn-primary encora-purple-button"
        >
          Registrar
        </button>
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

export default RegistrarClienteForm;