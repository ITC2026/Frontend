import "../../index.css";
import "./style/FormGroup.css";
import { InputType } from "./modalType";
import Input from "./Input";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

interface Props {
 nameLabel: string;
 disableInput: boolean;
 inputType: InputType;
 content?: string; 
 selectOptions?: string[];
 onChange?: (value: string | number) => void;
}

const GenericFormGroup = ({ nameLabel, inputType, disableInput, content, selectOptions, onChange}: Props) => {
  const handleChange = (value: string | number) => {
    if (onChange) {
      onChange(value); 
    }
  };

  return (
    <Form.Group as={Row} className="mb-4 row-width-form">
      <Form.Label column sm={6} bsPrefix="label-style text-start">
        {nameLabel}
      </Form.Label>
      <Input inputType={inputType} disableInput={disableInput} text= {content} selectOptions={selectOptions} onChange = {handleChange} />
    </Form.Group>
  );
};

export default GenericFormGroup;