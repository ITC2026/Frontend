
import React from 'react';
import ProjectTable from '../../components/stafferComponents/ProjectTable';
import './StafferPage.css';

const StafferPage: React.FC = () => {
    const projects = [
        {
            name: 'Proyecto 1',
            client: 'Cliente A',
            completionPercentage: 50,
            dueDate: '2023-04-30',
            positions: 3,
            vacancies: 2,
        },
    ];

    return (
        <div className="staffer-page">
            <h1>Proyectos</h1>
            <ProjectTable projects={projects} />
        </div>
    );
};

export default StafferPage;
