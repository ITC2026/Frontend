import React, { useState, useEffect } from 'react';
import TableStaffer from '../../../components/staffer/TableStaffer';
import getCandidates from '../functions/forCandidates/getCandidates';
import orderPeopleTables from '../functions/orderTables'
import '../postulates/PostulatesPage.css';

const CandidatesPage: React.FC = () => {
    const [view, setView] = useState<'Bench' | 'Pipeline'>('Bench');
    const [candidates, setCandidates] = useState<Person[]>([]);

    const candidateBlueprint = {
        "name": "Nombre",
        "division": "División",
        "title": "Título de Trabajo",
        "tech_stack": "Tech Stack",
    };

    useEffect(() => {
        getCandidates().then(async (data: Person[] | undefined) => {
            if (!data) {
                return;
            }
            setCandidates(await orderPeopleTables(data));
        });
    }, [view]);

    const filterPostulateByStatus = (people: Person[], status: string) => {
        return people.filter((person) => person.status === status);
    }

    return (
        <div className='postulates-page'>
            <div className="top-status-wrapper">
                <button className= {view === 'Bench' ? 'button-is-selected' : 'button-not-selected'} onClick={() => setView('Bench')}>Bench</button>
                <button className= {view === 'Pipeline' ? 'button-is-selected' : 'button-not-selected'} onClick={() => setView('Pipeline')}>Pipeline</button>
            </div>
            <div className="project-table-container">
                <h1 className="table-title">Lista de Candidatos</h1>
                <div className="table-wrapper">
                    <TableStaffer entity={filterPostulateByStatus(candidates, view)} types={candidateBlueprint} showAddButton={true}/> 
                </div>
            </div>
        </div>
    );
};

export default CandidatesPage;
