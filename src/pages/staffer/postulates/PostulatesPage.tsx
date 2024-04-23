import React, { useState, useEffect } from 'react';
import ViewTable from '../../../components/table/Table';
import './PostulatesPage.css';
import { getAllPeople } from '../../../api/PersonAPI';

const PostulatesPage: React.FC = () => {
    const [view, setView] = useState<'Bench' | 'Pipeline'>('Bench');
    const [people, setPeople] = useState<Person[]>([]);

    const personBlueprint = {
        "first_name": "Nombre",
        "last_name": "",
        "project": "Proyecto al que fue postulado",
        "position": "Posición de Trabajo",
        "division": "Division"
    };
    
    Object.defineProperty(personBlueprint, 'name', {
        get: function() {
            return `${this.first_name} ${this.last_name}`;
        }
    });

    useEffect(() => {
        getAllPeople().then((data: unknown) => {
          setPeople(data as Person[]);
          console.log(data);
        });
      }, [setPeople]);

    const filterPeopleByStatus = (people: Person[], status: string) => {
        return people.filter(person => person.status === status);
    }
    
    return (
        <div className='postulates-page'>
            <div className="buttons-container">
                <button onClick={() => setView('Bench')}>Bench</button>
                <button onClick={() => setView('Pipeline')}>Pipeline</button>
            </div>
            <div className="project-table-container">
                <h1 className="table-title">Lista de Postudalos</h1>
                <div className="table-wrapper">
                    <ViewTable entity={filterPeopleByStatus(people, view)} types={personBlueprint} />    
                </div>
            </div>
        </div>
    );
};

export default PostulatesPage;
