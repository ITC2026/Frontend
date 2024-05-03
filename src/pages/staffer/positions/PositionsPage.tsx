import React, { useState, useEffect } from 'react';
import "./PositionsPage.css";
import { Link } from "react-router-dom";
import TableStaffer from "../../../components/staffer/TableStaffer";
import getProjectPositions from '../functions/forPositions/getProjectPositions';
import { useParams } from 'react-router-dom';
import getPostulatesForPosition from '../functions/forPositions/getPostulatesForPosition';
import getPostulateApplicationProgress from '../functions/forPositions/getPostulateApplicationProgress';
import getPositionVacancies from '../functions/forPositions/getPositionVacancies';
import getDemandCuration from '../functions/forPositions/getDemandCuration';

const PositionsPage: React.FC = () => {
    const [positions, setPositions] = useState<Position[]>([]);
    const [position, setPosition] = useState<Position>();
    const [view, setView] = useState<"Position 1" | "Position 2">("Position 1");
    const [postulates, setPostulates] = useState<Person[]>([]);
    const [vacancies, setVacancies] = useState<number>(0);  
    const [demandCuration, setDemandCuration] = useState<string>("");
    

    const { id } = useParams();
    const projectId = parseInt(id as string);

    useEffect(() => {
        getProjectPositions(projectId).then((data: Position[]) => {
            if (data) {
                setPositions(data);
            } else {
                console.error('No data fetched');
            }
        });
    }, [projectId]);

    useEffect(() => {
        if (view === "Position 1") {
            setPosition(positions[0]);
        }
        else if (view === "Position 2") {
            setPosition(positions[1]);
        } else {
            console.error("Invalid position");
        }
    }), [view, positions];

    useEffect(() => { 
        getPostulatesForPosition(position?.id as number ).then(async (data) => {
            if (!data) {
                return;
            } 

            const postulatePromises : Person[] = await Promise.all(
                data.map(async (person: Person) => {
                    const appStatus : string = await getPostulateApplicationProgress(position?.id as number, data as Person[]);
                    return { ...person, application_status : appStatus , application_date : "05/03/2023"};
            }));
            setPostulates(postulatePromises.filter(Boolean) as Person[]);
        });
    }, [view,positions,position]);

    const handleVacancies = () => {
        getPositionVacancies(position?.id as number).then((data: number) => {
            setVacancies(data);
        });
        return;
    }

    useEffect(() => {
        handleVacancies();
    }, [position]);

    const handleDemandCuration = () => {
        getDemandCuration(projectId, position as Position).then((data: string) => {
            setDemandCuration(data);
        });
        return;
    }

    useEffect(() => {
        handleDemandCuration();
    }, [position]);

    const posTitles = (position: string) => {
        var whichPos: number = 0;
        if (position === "Position 1") {
            whichPos = 0;
        } else if (position === "Position 2") {
            whichPos = 1;
        }
        return (positions && positions[whichPos]?.position_title as string);
    };

    const handleViewChange = (position: "Position 1" | "Position 2") => {
        setView(position);
    };


    return (
        <div className="positions-page">
            <h1>Posiciones de Proyecto</h1>
            <h2>{posTitles(view)}</h2>

            <div className="buttons-container">
                <button className={`button ${view === "Position 1" ? "selected" : ""}`} onClick={() => handleViewChange("Position 1")}>
                    <div className="button-title">{posTitles("Position 1")}</div>
                    <div className="button-vacancies">Vacantes Disponibles: 2 / 6</div>
                </button>
                <button className={`button ${view === "Position 2" ? "selected" : ""}`} onClick={() => handleViewChange("Position 2")}>
                    <div className="button-title">{posTitles("Position 2")}</div>
                    <div className="button-vacancies">Vacantes Disponibles: 3 / 5</div>
                </button>
            </div>
            <div className="project-table-container">
                <h1 className="table-title">{posTitles(view)}</h1>
                <div className="table-wrapper">
                    <Link to={`${position?.id}/candidates`}>
                        <button className="button1">
                            <h1>Añadir Candidato</h1>
                        </button>
                    </Link>
                    <div className="position-details">
                        <div className="detail-column">
                            <div className="detail-row">
                                <h3><b>Tech Stack:</b> {position?.tech_stack}</h3>
                                <h3><b>Division:</b> {position?.division}</h3>
                            </div>
                            <div className="detail-row">
                                <h3><b>Demand Curation:</b> {demandCuration}</h3>
                                <h3><b>Vacantes Disponibles: </b> {vacancies}</h3>
                            </div>
                            <div className="detail-row">
                                <h3><b>Region:</b> {position?.region}</h3>
                                <h3><b>Tarifa:</b> {position?.bill_rate}</h3>
                            </div>
                            <div className="detail-row">
                                <h3><b>Posting Type:</b> {position?.posting_type}</h3>
                                <h3><b>Horas de trabajo a la semana:</b> {position?.working_hours}</h3>
                            </div>
                        </div>
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