import "../style/LargeModal.css"
import GenericFormGroup from "../GenericFormGroup";
import CheckboxFormGroup from "../CheckboxFormGroup";

const RegistrarClienteForm = () => {
  return (
    <div className="form-group">
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
    </div>
  );
}

export default RegistrarClienteForm;