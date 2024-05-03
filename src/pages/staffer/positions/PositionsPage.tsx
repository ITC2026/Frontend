import React, { useState, useEffect } from 'react';
import "./PositionsPage.css";
import { Link } from "react-router-dom";
import TableStaffer from "../../../components/staffer/TableStaffer";
import  getProjectPositions  from '../functions/forPositions/getProjectPositions';
import { fetchPositionsData } from '../functions/forPositions/fetchPositionsData';
import { useParams } from 'react-router-dom';
import getPostulates from '../functions/forPostulates/getPostulates';



const PositionsPage: React.FC = () => {
    const [positions, setPositions] = useState<Position[]>([]);
    const [view, setView] = useState<"Position 1" | "Position 2">("Position 1");
    const [postulates, setPostulates] = useState<Person[]>([]);

    const { id }  = useParams();
    const projectId = parseInt(id as string);

    
    useEffect(() => { 
        getPostulates().then((data) => {
            if (data) {
                setPostulates(data);
            } else {
                console.error('No data fetched');
            }
        });
    }, []);
    
    useEffect(() => {
        getProjectPositions(projectId).then((data : Position[]) => {
            if (data) {
                setPositions(data);
            } else {
                console.error('No data fetched');
            }
        });
    }, [projectId]);

    // const filterPositionsByType = (people: Person[] | undefined, posting_type: string) => {
    //     if (!people) {
    //         return [];
    //     }
    //     return people.filter((position) => position.posting_type === posting_type);
    // };

    const posTitles = (position: string) => {
        var whichPos : number = 0;
        if (position === "Position 1") {
            whichPos = 0;
        } else if (position === "Position 2") {
            whichPos = 1;
        }
        return (positions && positions[whichPos]?.position_title as string);
    };

    return (
        <div className="positions-page">
            <h1>Posiciones de Proyecto</h1>
            <h2>{posTitles(view)}</h2>
            
            <div className="buttons-container">
                <button className="button" onClick={() => setView("Position 1")}>
                    <div className="button-title">{posTitles("Position 1")}</div>
                    <div className="button-vacancies">Vacantes Disponibles: 2 / 6</div>
                </button>
                <button className="button" onClick={() => setView("Position 2")}>
                    <div className="button-title">{posTitles("Position 2")}</div>
                    <div className="button-vacancies">Vacantes Disponibles: 3 / 5</div>
                </button>
            </div>
            <div className="project-table-container">
                <h1 className="table-title">{posTitles(view)}</h1>
                <div className="table-wrapper">
                    <Link to={"candidates"}>
                        <button className="button1">
                            <h1>Añadir Candidato</h1>
                        </button>
                    </Link>
                    <div className="position-details">
                        <div className="detail-column">
                            <div className="detail-row">
                                <h3>Tech Stack:</h3>
                                <h3>Division:</h3>
                            </div>
                            <div className="detail-row">
                                <h3>Demand Type:</h3>
                                <h3>Vacantes Disponibles:</h3>
                            </div>
                            <div className="detail-row">
                                <h3>Region:</h3>
                                <h3>Tarifa:</h3>
                            </div>
                            <div className="detail-row">
                                <h3>Posting Type:</h3>
                                <h3>Horas de trabajo a la semana:</h3>
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
