import React, { useState } from 'react';
import './ProjectTable.css';
import SearchBar from '../SearchBar/Search_bar';

interface Project {
    name: string;
    client: string;
    completionPercentage: number;
    dueDate: string;
    positions: number;
    vacancies: number;
}

const ProjectTable: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const projects: Project[] = [
        { name: 'Proyecto 1', client: 'Cliente 1', completionPercentage: 50, dueDate: '2024-12-31', positions: 5, vacancies: 2 },
        { name: 'Proyecto 2', client: 'Cliente 2', completionPercentage: 20, dueDate: '2024-11-30', positions: 3, vacancies: 1 },
        { name: 'Proyecto 3', client: 'Cliente 3', completionPercentage: 75, dueDate: '2024-10-31', positions: 4, vacancies: 0 },
        { name: 'Proyecto 4', client: 'Cliente 4', completionPercentage: 60, dueDate: '2024-09-30', positions: 2, vacancies: 1 },
        { name: 'Proyecto 5', client: 'Cliente 5', completionPercentage: 80, dueDate: '2024-08-31', positions: 6, vacancies: 3 },
        { name: 'Proyecto 6', client: 'Cliente 6', completionPercentage: 90, dueDate: '2024-07-31', positions: 1, vacancies: 0 },
        { name: 'Proyecto 7', client: 'Cliente 7', completionPercentage: 100, dueDate: '2024-06-30', positions: 3, vacancies: 0 },
    ];

    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="project-table-container">
            <h1 className="project-table-title">Lista de proyectos</h1>
            <SearchBar onSearchTermChange={setSearchTerm} />
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre de proyecto</th>
                        <th>Cliente</th>
                        <th>% Completado</th>
                        <th>Fecha establecida</th>
                        <th>Posiciones</th>
                        <th>Vacantes</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProjects.map((project, index) => (
                        <tr key={index}>
                            <td>{project.name}</td>
                            <td>{project.client}</td>
                            <td>{project.completionPercentage}%</td>
                            <td>{project.dueDate}</td>
                            <td>{project.positions}</td>
                            <td>{project.vacancies}</td>
                            <td>Opciones</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectTable;