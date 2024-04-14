import React, { useState } from 'react';
import BenchTable from '../../components/stafferComponents/BenchTable';
import PipelineTable from '../../components/stafferComponents/PipelineTable';
import './PeoplePage.css';

const PeoplePage: React.FC = () => {
    const [view, setView] = useState<'bench' | 'pipeline'>('bench');

    // Datos de ejemplo para Bench y Pipeline
    const benchPostulates = [
        { name: 'Juan Pérez', project: 'Proyecto A', position: 'Desarrollador', status: 'En revisión' },
        { name: 'Ana Sánchez', project: 'Proyecto B', position: 'Diseñadora', status: 'Aceptado' },
        // Agrega más postulados según sea necesario
    ];

    const pipelinePostulates = [
        { name: 'Carlos Gómez', project: 'Proyecto C', position: 'Gerente de Proyecto', status: 'En proceso' },
        { name: 'María Rodríguez', project: 'Proyecto D', position: 'Analista', status: 'Rechazado' },
        // Agrega más postulados según sea necesario
    ];

    return (
        <div>
            <div className="buttons-container">
                <button onClick={() => setView('bench')}>Bench</button>
                <button onClick={() => setView('pipeline')}>Pipeline</button>
            </div>
            {view === 'bench' && <BenchTable postulates={benchPostulates} />}
            {view === 'pipeline' && <PipelineTable postulates={pipelinePostulates} />}
        </div>
    );
};

export default PeoplePage;
