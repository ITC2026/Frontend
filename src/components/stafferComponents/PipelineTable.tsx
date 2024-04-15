import React, { useState } from 'react';
import './BenchTable.css';
import vectorIcon from '../../assets/Staffer/Vector.png';
import vectorIcon1 from '../../assets/Staffer/Vector (1).png';
import ChangeStatusModal from '../stafferComponents/ChangeStatusModal';
import SearchBar from '../SearchBar/Search_bar.tsx';

interface Postulate {
    name: string;
    project: string;
    position: string;
    status: string;
}

interface TableProps {
    postulates: Postulate[];
}

const PipelineTable: React.FC<TableProps> = ({ postulates }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleImageClick = () => {
        setIsModalOpen(true);
    };

    const filteredPostulates = postulates.filter(postulate =>
        postulate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        postulate.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
        postulate.position.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bench-table-container">
            <h2 className="bench-table-title">Lista de Postulados en Pipeline</h2>
            <SearchBar onSearchTermChange={setSearchTerm} />
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Proyecto al que fue postulado</th>
                        <th>Posición de trabajo</th>
                        <th>Estado</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPostulates.map((postulate, index) => (
                        <tr key={index}>
                            <td>{postulate.name}</td>
                            <td>{postulate.project}</td>
                            <td>{postulate.position}</td>
                            <td>{postulate.status}</td>
                            <td>
                                <div className="icon-container">
                                    <img src={vectorIcon} alt="Opciones" className="option-icon-1" />
                                    <img src={vectorIcon1} alt="Opciones" className="option-icon-2" onClick={handleImageClick} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ChangeStatusModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default PipelineTable;
