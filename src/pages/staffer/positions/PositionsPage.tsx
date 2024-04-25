import React, { useState, useEffect } from 'react';
import './PositionsPage.css';
import TableView from '../../../components/table/Table';
import { getAllPositions } from '../../../api/PositionAPI'; // Asegúrate de tener una API para obtener las posiciones

const PositionsPage: React.FC = () => {
    const [view, setView] = useState<'Fiber Technician' | 'Quality Control Tech'>('Fiber Technician');
    const [positions, setPositions] = useState<Position[]>([]); // Nuevo estado para los datos de la tabla

    const positionBlueprint = {
        "candidate_name": "Nombre del Candidato",
        "application_status": "Estado en la Postulación",
        "company_status": "Estado en la Empresa",
        "application_date": "Fecha de Postulación",
        "options": "Opciones"
    };

    useEffect(() => {
        getAllPositions().then((data: unknown) => {
            setPositions(data as Position[]);
            console.log(data);
        });
    }, [setPositions]);

    const filterPositionsByType = (positions: Position[], posting_type: string) => {
        return positions.filter(position => position.posting_type === posting_type);
    }

    return (
        <div className='positions-page'>
            <h1>Posiciones de Proyecto</h1>
            <h2>Project / Software Engineer</h2>
            <div className="buttons-container">
                <button className='button' onClick={() => setView('Fiber Technician')}>Fiber Technician<br />ID: A32521<br />Vacantes Disponibles: 2 / 6</button>
                <button className='button' onClick={() => setView('Quality Control Tech')}>Quality Control Tech<br />ID: B12345<br />Vacantes Disponibles: 3 / 5</button>
            </div>
            <div className="project-table-container">
                <h1 className="table-title">{view}</h1>
                <div className="table-wrapper">
                    <TableView entity={filterPositionsByType(positions, view)} types={positionBlueprint} categories="StafferProject" />
                </div>
            </div>
        </div>
    );
};

export default PositionsPage;
