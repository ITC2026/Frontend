import React, { useState, useEffect } from 'react';
import { createPerson } from "../../../api/PersonAPI";
import  getPostulates  from '../functions/getPostulates';
import TablePostulates from '../../../components/staffer/TablePostulates';
import './PostulatesPage.css';

const PostulatesPage: React.FC = () => {
    const [view, setView] = useState<'Bench' | 'Pipeline'>('Bench');
    const [postulates, setPostulates] = useState<Person[]>([]);
    const [person, setPerson] = useState<CreatePersonAttributes>();

    const personInject: CreatePersonAttributes = {
        "first_name": "Polo",
        "last_name": "Hernandez",
        "profile_picture": "https://example.com/profiles/johndoe.jpg",
        "gender": "Male",
        "phone": "123-456-7890",
        "email": "anemail@gmail.com",
        "title": "Software Engineer",
        "tech_stack": ".NET",
        "division": "MEXICO",
        "region": "CUU",
        "movement_reason": "Porque sí",
        "expected_salary": 10,
        "status": "Pipeline"
    }

    const personBlueprint = {
        "first_name": "Nombre",
        "last_name": "",
        "project_name": "Proyecto al que fue postulado",
        "position_name": "Posición de Trabajo",
        "division": "Division"
    };

    useEffect(() => {
        getPostulates().then((data: unknown) => {
            setPostulates(data as Person[]);
            console.log(data);
        });
    }, [view, person]);

    useEffect(() => {
        if (person) {
            createPerson(person).then(() => {
                setPerson(undefined);
            }).catch((err: Error )=> {
                console.error("Error creating person:", err);
            });
        }
    }, [person]);

    const filterPeopleByStatus = (people: Person[], status: string) => {
        return people.filter((person) => person.status === status);
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
                    <button className='button' onClick={() => setPerson(personInject)}>Agrega Un Tilin</button>
                    <TablePostulates entity={filterPeopleByStatus(postulates, view)} types={personBlueprint} categories='Person' /> 
                </div>
            </div>
        </div>
    );
};

export default PostulatesPage;
