import React, { useState, useEffect } from "react";
import "./PositionsPage.css";
import { Link } from "react-router-dom";
import TableStaffer from "../../../components/staffer/TableStaffer";
import getProjectPositions from "../functions/forPositions/getProjectPositions";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import getPostulatesForPosition from "../functions/forPositions/getPostulatesForPosition";
import getPostulateApplicationProgress from "../functions/forPositions/getPostulateApplicationProgress";
import getPositionVacancies from "../functions/forPositions/getPositionVacancies";
import getDemandCuration from "../functions/forPositions/getDemandCuration";

import { JobPreviewList } from "../../../components/staffer/ProjectPositions/JobPreviewList";
import { getProjectById } from "../../../api/ProjectAPI";
import { JobPositionPreviewInfo } from "../../../components/staffer/ProjectPositions/JobPositionPreviewInfo/JobPosPreviewInfo";

const PositionsPage: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [position, setPosition] = useState<Position>();
  const [view, setView] = useState<"Position 1" | "Position 2">("Position 1");
  const [postulates, setPostulates] = useState<Person[]>([]);
  const [vacancies, setVacancies] = useState<number>(0);
  const [demandCuration, setDemandCuration] = useState<string>("");

  const [projectTitle, setProjectTitle] = useState<string>("");
  const location = useLocation();

  const [showingId, setShowingId] = useState<number>(0);

  const { id } = useParams();

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

  useEffect(() => {
    getProjectPositions(projectId).then((data: Position[]) => {
      if (data) {
        setPositions(data);
      } else {
        console.error("No data fetched");
      }
    });
  }, [projectId]);

  useEffect(() => {
    if (view === "Position 1") {
      setPosition(positions[0]);
    } else if (view === "Position 2") {
      setPosition(positions[1]);
    } else {
      console.error("Invalid position");
    }
  }),
    [view, positions];

  useEffect(() => {
    getPostulatesForPosition(position?.id as number).then(async (data) => {
      if (!data) {
        return;
      }

      const postulatePromises: Person[] = await Promise.all(
        data.map(async (person: Person) => {
          const appStatus: string = await getPostulateApplicationProgress(
            position?.id as number,
            data as Person[]
          );
          return {
            ...person,
            application_status: appStatus,
            application_date: "05/03/2023",
          };
        })
      );
      setPostulates(postulatePromises.filter(Boolean) as Person[]);
    });
  }, [view, positions, position]);

  const handleVacancies = () => {
    getPositionVacancies(position?.id as number).then((data: number) => {
      setVacancies(data);
    });
    return;
  };

  useEffect(() => {
    handleVacancies();
  }, [position]);

  const handleDemandCuration = () => {
    getDemandCuration(projectId, position as Position).then((data: string) => {
      setDemandCuration(data);
    });
    return;
  };

  useEffect(() => {
    handleDemandCuration();
  }, [position]);

  const posTitles = (position: string) => {
    let whichPos: number = 0;
    if (position === "Position 1") {
      whichPos = 0;
    } else if (position === "Position 2") {
      whichPos = 1;
    }
    return positions && (positions[whichPos]?.position_title as string);
  };

  const handleViewChange = (position: "Position 1" | "Position 2") => {
    setView(position);
  };

  return (
    <div className="positions-page">
      <h1>Posiciones de Proyecto</h1>
      <h2>{projectTitle}</h2>

      <div className="project-table-container">
        <div className="table-wrapper">
          <JobPreviewList setId={setShowingId} project_id={Number(id)} />
          <Link to={`${position?.id}/candidates`}>
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
              name: "Nombre del Candidato",
              application_status: "Estado en la Postulación",
              status: "Estado del Postulado",
              application_date: "Fecha de Postulación",
            }}
            showInfoButton={true}
          />
        </div>
      </div>
    </div>
  );
};

export default PositionsPage;
