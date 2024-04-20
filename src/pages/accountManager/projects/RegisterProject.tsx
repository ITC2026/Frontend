import LargeModal from "../../../components/modal/LargeModal";
import { useState, useEffect } from "react";
import { EntityFormType } from "../../../components/modal/modalType";
import getClientNamesAndIds from "../../../utils/Clients/GetClientNamesID";
import modelProject from "../../../utils/Project/ModelProject_Func";
import { toast } from 'react-toastify';

interface Props {
  onClose: () => void;
  isOpen: boolean;
}

interface Options {
  id: string;
  name: string;
}

const initialFormStructure: EntityFormType = {
  entity: "Proyecto",
  formStructure: {
    "Nombre del Proyecto": {
      inputType: "text",
      canBeModified: true,
    },
    Descripción: {
      inputType: "text",
      canBeModified: true,
    },
    Cliente: {
      inputType: "select",
      canBeModified: true,
      selectOptions: [],
    },
    "Fecha de Apertura": {
      inputType: "date",
      canBeModified: true,
    },
    "¿El Proyecto es durante un tiempo determinado?": {
      inputType: "checkbox",
      canBeModified: true,
      whichInputCanDisabled: [5],
    },
    "Fecha de Cierre": {
      inputType: "date",
      canBeModified: true,
    },
  },
};

const RegisterProject = (prop: Props) => {
  const [clientNames, setClientNames] = useState<Options[]>([]);
  const [entityForm, setEntityForm] =
    useState<EntityFormType>(initialFormStructure);

  useEffect(() => {
    const fetchClientNames = async () => {
      const names = await getClientNamesAndIds();
      setClientNames(names);
    };
    fetchClientNames();
  }, []);

  useEffect(() => {
    setEntityForm((prevForm) => ({
      ...prevForm,
      formStructure: {
        ...prevForm.formStructure,
        Cliente: {
            ...prevForm.formStructure.Cliente,
          selectOptions: clientNames,
        },
      },
    })
    );
  }, [clientNames]);

  const handleProjectSubmit = async (formValues: {
    [key: string]: string;
  }): Promise<void> => {
    try {
      await modelProject(formValues);
      toast.success("Project registered successfully!");
    } catch (error) {
      console.error("Error submitting project:", error);
      toast.error("Error Registering Project!");
    }
  };



  return (
    <div>
      {prop.isOpen && clientNames && (
        <LargeModal
          typeOfModal="register"
          titleModal="Registrar Proyecto"
          entityForm={entityForm}
          onClose={prop.onClose}
          updateFunction={handleProjectSubmit}
        />
      )}
    </div>
  );
};

export default RegisterProject;
