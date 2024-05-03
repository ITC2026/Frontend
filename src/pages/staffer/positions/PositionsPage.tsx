import React, { useState, useEffect } from "react";
import "./PositionsPage.css";
import TableStaffer from "../../../components/staffer/TableStaffer";
import { useParams, useLocation, Outlet, Link } from "react-router-dom";
import getPostulatesForPosition from "../functions/forPositions/getPostulatesForPosition";
import getPostulateApplicationProgress from "../functions/forPositions/getPostulateApplicationProgress";
import getDemandCuration from "../functions/forPositions/getDemandCuration";
import { getApplicationIDFromPersonPositionID } from "../../../utils/Application/GetApplicationIDFromPersonPositionID";
import { JobPreviewList } from "../../../components/staffer/ProjectPositions/JobPreviewList";
import { getProjectById } from "../../../api/ProjectAPI";
import { JobPositionPreviewInfo } from "../../../components/staffer/ProjectPositions/JobPositionPreviewInfo/JobPosPreviewInfo";
import { formatDate } from "../../../utils/Dates";

const PositionsPage: React.FC = () => {
  const [postulates, setPostulates] = useState<Person[]>([]);
  const [demandCuration, setDemandCuration] = useState<string>("");
  const [projectTitle, setProjectTitle] = useState<string>("");
  const [showingId, setShowingId] = useState<number>(0);
  const [routing, setRouting] = useState<number>(0); 
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    getProjectById(Number(id)).then((project) => {
      if (!project) {
        return;
      }
      setProjectTitle(project.project_title);
    });
  }, [id]);

  useEffect(() => {
    console.log(`id: ${id}`);
  }, [id]);
  const projectId = parseInt(id as string);

  const generateUniqueId = () => {
    return Math.floor(Math.random() * 100000);
  };

  useEffect(() => {
    getPostulatesForPosition(showingId).then(async (data) => {
      if (!data) {
        return;
      }

    const postulatePromises = await Promise.all(
        data.map(async (person: Person) => {
            const appStatus = await getPostulateApplicationProgress(
                showingId,
                person.id
            );
            const applicationId = await getApplicationIDFromPersonPositionID(person.id, showingId);

            setRouting(applicationId)
            return {
                ...person,
                application_status: appStatus,
                application_date: formatDate(new Date().toISOString()),
                id: person.id || generateUniqueId(),
                application_id: applicationId
            };
        })
    );

      setPostulates(postulatePromises.filter(Boolean) as Person[]);
    });
  }, [showingId, location]);

  const handleDemandCuration = () => {
    getDemandCuration(projectId, showingId).then((data: string) => {
      setDemandCuration(data);
    });
    return;
  };

  useEffect(() => {
    handleDemandCuration();
  }, [showingId]);

  return (
    <div className="positions-page">
      <h1>Posiciones de Proyecto</h1>
      <h2>{projectTitle}</h2>

      <div className="project-table-container">
        <div className="table-wrapper">
          <JobPreviewList setId={setShowingId} project_id={Number(id)} />
          <Link to={`${showingId}/candidates`}>
            <button className="button1">
              <h1>Añadir Candidato</h1>
            </button>
          </Link>
          <div className="position-details">
            <div className="detail-column"></div>
            <JobPositionPreviewInfo
              demandCuration={demandCuration}
              id={showingId}
            />
          </div>

          <TableStaffer
            entity={postulates}
            types={{
                application_id: "ID de la Aplicacion", 
              name: "Nombre del Candidato",
              application_status: "Estado en la Postulación",
              status: "Estado del Postulado",
              application_date: "Fecha de Postulación",
            }}
            showInfoButton={true}
            showEditButton={true}
            routing={routing}
          />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default PositionsPage;
