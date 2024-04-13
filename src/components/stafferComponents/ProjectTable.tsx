import React from 'react';
import './ProjectTable.css';

interface Project {
    name: string;
    client: string;
    completionPercentage: number;
    dueDate: string;
    positions: number;
    vacancies: number;
}

interface ProjectTableProps {
    projects: Project[];
}

const ProjectTable: React.FC<ProjectTableProps> = ({ projects }) => {
    return (
        <div className="project-table-container">
            <h1 className="project-table-title">Lista de proyectos</h1>
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
                    {projects.map((project, index) => (
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
                    {}
                    {[...Array(10)].map((_, index) => (
                        <tr key={index + projects.length}>
                            <td>Proyecto Ejemplo {index + 1}</td>
                            <td>Cliente Ejemplo</td>
                            <td>{50 + index}%</td>
                            <td>2023-04-30</td>
                            <td>3</td>
                            <td>2</td>
                            <td>Opciones</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectTable;
