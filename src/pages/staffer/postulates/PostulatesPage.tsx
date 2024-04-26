import React, { useState, useEffect } from 'react';
import { createPerson } from "../../../api/PersonAPI";
import  getPostulates  from '../functions/forPostulates/getPostulates';
import TableStaffer from '../../../components/staffer/TableStaffer';
import getProjectTitleFromID from '../functions/forPostulates/getProjectTitleForPerson';
import getPositionTitleFromID from '../functions/forPostulates/getPositionTitleForPerson';
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

    const benchInject: CreatePersonAttributes = {
            "salary": 30000,
            "job_grade": "C6",
            "proposed_action": "Project Search",
            "employee_status": "On Hired",
            "employee_reason": "Intern",
            "first_name": "Renato",
            "last_name": "Maligon",
            "profile_picture": "https://example.com/profiles/johndoe.jpg",
            "gender": "Male",
            "phone": "123-456-7890",
            "email": "mymail@gmail.com",
            "title": "Software Engineer",
            "tech_stack": "Java",
            "division": "USA",
            "region": "CUU",
            "movement_reason": "Porque sí",
            "expected_salary": 10,
            "status": "Bench"
        }

    const personBlueprint = {
        "first_name": "Nombre",
        "last_name": "",
        "project_name": "Proyecto al que fue postulado",
        "position_name": "Posición de Trabajo",
        "division": "Division"
    };

    useEffect(() => {
        getPostulates().then(async (data: Person[]) => {
            if (!data) {
                return
            }
            const personPositionPromises = await Promise.all(
                data.map(async (person : Person) => {
                    const position = await getPositionTitleFromID(person.id);
                    return {...person , position_name: position};
                
            }));
            setPostulates(personPositionPromises);
            
            const personProjectPromises = await Promise.all(
                personPositionPromises.map(async (person : Person) => {
                    const project = await getProjectTitleFromID(person.id);
                    return {...person , project_name: project};
            }));
            setPostulates(personProjectPromises);
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
                    <button className='button' onClick={() => setPerson(view === 'Bench' ? benchInject : personInject)}>Agrega Un Tilin</button>
                    <TableStaffer entity={filterPeopleByStatus(postulates, view)} types={personBlueprint} categories='Person' /> 
                </div>
            </div>
        </div>
    );
};

export default PostulatesPage;
