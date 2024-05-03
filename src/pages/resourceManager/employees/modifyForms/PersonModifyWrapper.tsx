import LargeModal from "../../../../components/modal/LargeModal";

import ModifyBenchForm from "./ModifyBenchForm";
import ModifyBillingForm from "./ModifyBillingForm";
import ModifyPipelineForm from "./ModifyPipelineForm";

import { getPersonById } from "../../../../api/PersonAPI";

import "./PersonModifyWrapper.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router";

const PersonModifyWrapper = () => {

    const { id } = useParams<{ id: string }>();

    const [person, setPerson] = useState<Person | undefined>(undefined);

    useEffect(() => {
        if (id) {
        getPersonById(Number(id)).then((person) => {
            if (person) {
            setPerson(person);
            }
        });
        }
    } , [id]);

    if(!person) {
        return null;
    }

    if (person.status === "Pipeline") {
    return (
      <LargeModal
        titleModal={`Modificando a ${person.name}`}
        formContent={<ModifyPipelineForm />}
      />
    );
    } else if (person.status === "Bench") {
    return (
      <LargeModal
      titleModal={`Modificando a ${person.name}`}
      formContent={<ModifyBenchForm />}
      />
    );
    } else if (person.status === "Billing") {
    return (
      <LargeModal
      titleModal={`Modificando a ${person.name}`}
      formContent={<ModifyBillingForm />}
      />
    );
    }
};

export default PersonModifyWrapper;
