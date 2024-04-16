import React, { useState, useEffect } from 'react';
import ViewTable from '../../../components/table/Table';
import { Person } from "../../../types/.";
//import { getAllPeople } from "../../../api/ProjectAPI";
import './PostulatesPage.css';

const PostulatesPage: React.FC = () => {
    const [view, setView] = useState<'bench' | 'pipeline'>('bench');

    const personBlueprint = {
        "name": "Nombre",
        "project": "Proyecto al que fue postulado",
        "position": "Posición de Trabajo",
        "division": "Division",
      }


    // const [people, setPeople] = useState<Person[]>([]);
      
    //     useEffect(() => {
    //         getAllPeople().then((data: unknown) => {
    //         setPeople(data as Person[]);
    //         console.log(data);
    //       });
    //     }, [setPeople]);

    return (
        <div className='postulates-page'>
            <div className="buttons-container">
                <button onClick={() => setView('bench')}>Bench</button>
                <button onClick={() => setView('pipeline')}>Pipeline</button>
            </div>
            <div className="project-table-container">
                <h1 className="table-title">Lista de Postudalos</h1>
                <div className="table-wrapper">
                    {/* {view === 'bench' && <ViewTable entity={people} types={personBlueprint}/>}
                    {view === 'pipeline' && <ViewTable entity={people} types={personBlueprint}/>} */}
                </div>
            </div>
        </div>
    );
};

export default PostulatesPage;