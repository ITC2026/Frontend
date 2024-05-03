import LargeModal from "../../../../components/modal/LargeModal";

import InfoBenchForm from "./InfoBenchForm";
import InfoBillingForm from "./InfoBillingForm";
import InfoPipelineForm from "./InfoPipelineForm";

import { getPersonById } from "../../../../api/PersonAPI";

import "../modifyForms/PersonModifyWrapper.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router";

const PersonInfoWrapper = () => {

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
        titleModal={`Información de ${person.name}`}
        formContent={<InfoPipelineForm />}
      />
    );
    } else if (person.status === "Bench") {
    return (
      <LargeModal
        titleModal={`Información de ${person.name}`}
        formContent={<InfoBenchForm />}
      />
    );
    } else if (person.status === "Billing") {
    return (
      <LargeModal
        titleModal={`Información de ${person.name}`}
        formContent={<InfoBillingForm />}
      />
    );
    }
};

export default PersonInfoWrapper;
