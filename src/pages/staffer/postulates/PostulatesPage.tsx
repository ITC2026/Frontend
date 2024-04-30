import React, { useState, useEffect } from 'react';
import  getPostulates  from '../functions/forPostulates/getPostulates';
import TableStaffer from '../../../components/staffer/TableStaffer';
import getProjectTitleFromID from '../functions/forPostulates/getProjectTitleForPerson';
import getPositionTitleFromID from '../functions/forPostulates/getPositionTitleForPerson';
import { Link } from 'react-router-dom';
import './PostulatesPage.css';

const PostulatesPage: React.FC = () => {
    const [view, setView] = useState<'Bench' | 'Pipeline'>('Bench');
    const [postulates, setPostulates] = useState<Person[]>([]);

    const postitulateBlueprint = {
        "name": "Nombre",
        "project_name": "Proyecto al que fue postulado",
        "position_name": "Posición de Trabajo",
        "division": "Division"
    };

    useEffect(() => {
        getPostulates().then(async (data: Person[]) => {
            if (!data) {
                return
            }
            const postulatePositionPromises = await Promise.all(
                data.map(async (person : Person) => {
                    const position = await getPositionTitleFromID(person.id);
                    return {...person , position_name: position};
                
            }));
            setPostulates(postulatePositionPromises);
            
            const postulateProjectPromises = await Promise.all(
                postulatePositionPromises.map(async (person : Person) => {
                    const project = await getProjectTitleFromID(person.id);
                    return {...person , project_name: project};
            }));
            setPostulates(postulateProjectPromises);
            console.log(data);
        });
    }, [view]);

    const filterPostulateByStatus = (people: Person[], status: string) => {
        return people.filter((person) => person.status === status);
    }

    const modifyButton = () => {
        return (
            <i className='bi bi-pencil-fill'></i>
        );
    }

    return (
        <div className='postulates-page'>
            <div className="top-status-wrapper">
                <button className= {view === 'Bench' ? 'button-is-selected' : 'button-not-selected'} onClick={() => setView('Bench')}>Bench</button>
                <button className= {view === 'Pipeline' ? 'button-is-selected' : 'button-not-selected'} onClick={() => setView('Pipeline')}>Pipeline</button>
            </div>
            <div className="project-table-container">
                <h1 className="table-title">Lista de Postulados</h1>
                <div className="table-wrapper">
                    <TableStaffer entity={filterPostulateByStatus(postulates, view)} types={postitulateBlueprint} buttonArr={[modifyButton()]} showInfoButton={true}/> 
                </div>
            </div>
        </div>
    );
};

export default PostulatesPage;
