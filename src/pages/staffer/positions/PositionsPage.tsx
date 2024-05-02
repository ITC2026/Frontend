import React, { useState, useEffect } from 'react';
import "./PositionsPage.css";
import { Link } from "react-router-dom";
import TableStaffer from "../../../components/staffer/TableStaffer";
import  getProjectPositions  from '../functions/forPositions/getProjectPositions';
import { fetchPositionsData } from '../functions/forPositions/fetchPositionsData';
import { useParams } from 'react-router-dom';
import getPostulates from '../functions/forPostulates/getPostulates';



const PositionsPage: React.FC = () => {
    const [view, setView] = useState<"Fiber Technician" | "Quality Control Tech">("Fiber Technician");
    const [postulates, setPostulates] = useState<Person[]>([]);
    const [positions, setPositions] = useState<Position[]>([]);


    const { id }  = useParams();
    const projectId = parseInt(id as string);

    useEffect(() => {
        getProjectPositions(projectId).then((data) => {
            if (data) {
                setPositions(data);
            } else {
                console.error('No data fetched');
            }
        });
    }, [projectId]);
    
    useEffect(() => { 
        getPostulates().then((data) => {
            if (data) {
                setPostulates(data);
            } else {
                console.error('No data fetched');
            }
        });
    }, []);
    

    // const filterPositionsByType = (people: Person[] | undefined, posting_type: string) => {
    //     if (!people) {
    //         return [];
    //     }
    //     return people.filter((position) => position.posting_type === posting_type);
    // };

    return (
        <div className="positions-page">
            <h1>Posiciones de Proyecto</h1>
            <h2>{view}</h2>
            <div className="buttons-container">
                <button className="button" onClick={() => setView("Fiber Technician")}>
                    <div className="button-title">Fiber Technician</div>
                    <div className="button-vacancies">Vacantes Disponibles: 2 / 6</div>
                </button>
                <button className="button" onClick={() => setView("Quality Control Tech")}>
                    <div className="button-title">Quality Control Tech</div>
                    <div className="button-vacancies">Vacantes Disponibles: 3 / 5</div>
                </button>
            </div>
            <div className="project-table-container">
                <h1 className="table-title">{view}</h1>
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
