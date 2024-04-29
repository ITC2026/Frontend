import React, { useState, useEffect } from 'react';
import TableStaffer from '../../../components/staffer/TableStaffer';
import getPostulates from '../functions/forPostulates/getPostulates';
import { Link } from 'react-router-dom';
import '../postulates/PostulatesPage.css';

const CandidatesPage: React.FC = () => {
    const [view, setView] = useState<'Bench' | 'Pipeline'>('Bench');
    const [candidates, setCandidates] = useState<Person[]>([]);

    const postitulateBlueprint = {
        "name": "Nombre",
        "division": "División",
        "title": "Título de Trabajo",
        "tech_stack": "Tech Stack",
    };

    useEffect(() => {
        getPostulates(true).then(async (data: Person[] | undefined) => {
            if (!data) {
                return;
            }
            setCandidates(data);
        });
    }, [view]);

    const filterPostulateByStatus = (people: Person[], status: string) => {
        return people.filter((person) => person.status === status);
    }

    const infoButton = () => {
        return (
            <Link to={"/info"}>
                <i className='bi bi-info-circle-fill'></i>
            </Link>
        );
    }

    const addButton = () => {
        return (
            <i className='bi bi-plus-circle-fill'></i>
        );
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
                    <TableStaffer entity={filterPostulateByStatus(candidates, view)} types={postitulateBlueprint} buttonArr={[infoButton(), addButton()]}/> 
                </div>
            </div>
        </div>
    );
};

export default CandidatesPage;
