import React, { useState, useEffect } from 'react';
import './PositionsPage.css';
import TableStaffer from '../../../components/staffer/TableStaffer';
import { getAllPositions } from '../../../api/PositionAPI'; 

const PositionsPage: React.FC = () => {
    const [view, setView] = useState<'Fiber Technician' | 'Quality Control Tech'>('Fiber Technician');
    const [positions, setPositions] = useState<Position[]>([]); 

    const positionBlueprint = {
        "candidate_name": "Nombre del Candidato",
        "application_status": "Estado en la Postulación",
        "company_status": "Estado en la Empresa",
        "application_date": "Fecha de Postulación",
    };

    useEffect(() => {
        getAllPositions().then((data: unknown) => {
            setPositions(data as Position[]);
            console.log(data);
        });
    }, [setPositions]);

    const filterPositionsByType = (positions: Position[] | undefined, posting_type: string) => {
        if (!positions) {
            return []; 
        }
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
                    <TableStaffer entity={filterPositionsByType(positions, view)}  types={positionBlueprint} />
                </div>
            </div>
        </div>
    );
};

export default PositionsPage;