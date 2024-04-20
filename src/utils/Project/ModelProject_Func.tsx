import { createProject } from "../../api/ProjectAPI";
import { Project } from "../../types";

const modelProject = async (formValues: { [key: string]: string }) => {
  if (!formValues) {
    return;
  }

  console.log(`formValues: ${JSON.stringify(formValues)}`);

  console.log(`formValues: ${JSON.stringify(formValues)}`);
  const has_expiration_date = Boolean(
    formValues["¿El Proyecto es durante un tiempo indeterminado?"]
  );
  const expirationDate = new Date(
    formValues["Fecha de Cierre"] || ""
  );
  const startDate = new Date(
    formValues["Fecha de Apertura"] || ""
  );

  const client_id = parseInt(formValues["Cliente"] || "", 10);

  const project_to_upload: Project = {
    project_title: formValues["Nombre del Proyecto"] || "",
    project_description: formValues["Descripción"] || "",
    client_id: client_id,
    start_date: startDate,
    has_expiration_date: has_expiration_date,
    expiration: expirationDate,
    general_status: "In Preparation",
  };
  createProject(project_to_upload);
}; 

  export default modelProject;

