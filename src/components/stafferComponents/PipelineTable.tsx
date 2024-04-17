// PipelineTable.tsx
import React, { useState, useMemo } from 'react';
import './BenchTable.css';
import vectorIcon from '../../assets/Staffer/Vector.png';
import vectorIcon1 from '../../assets/Staffer/Vector (1).png';
import ChangeStatusModal from '../stafferComponents/ChangeStatusModal';
import SearchBar from '../SearchBar/Search_bar.tsx';
import Sort from '../Sort/sort';

interface Postulate {
    name: string;
    project: string;
    position: string;
    status: string;
    [key: string]: string; // Añade esta línea
}

interface TableProps {
    postulates: Postulate[];
}

const PipelineTable: React.FC<TableProps> = ({ postulates }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sort, setSort] = useState({ field: '', asc: false });

    const handleImageClick = () => {
        setIsModalOpen(true);
    };

    const handleSort = (asc: boolean, field: string) => {
        setSort({ field, asc });
    };

    const sortedPostulates = useMemo(() => {
        let filteredPostulates = postulates;
        if (searchTerm) {
            filteredPostulates = postulates.filter(postulate =>
                postulate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                postulate.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                postulate.position.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (sort.field) {
            return [...filteredPostulates].sort((a, b) =>
                sort.asc ? a[sort.field].localeCompare(b[sort.field]) : b[sort.field].localeCompare(a[sort.field])
            );
        }
        return filteredPostulates;
    }, [postulates, searchTerm, sort]);

    return (
        <div className="bench-table-container">
            <h2 className="bench-table-title">Lista de Postulados en Pipeline</h2>
            <SearchBar onSearchTermChange={setSearchTerm} />
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre<Sort onSort={handleSort} field="name" /></th>
                        <th>Proyecto al que fue postulado<Sort onSort={handleSort} field="project" /></th>
                        <th>Posición de trabajo<Sort onSort={handleSort} field="position" /></th>
                        <th>Estado<Sort onSort={handleSort} field="status" /></th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedPostulates.map((postulate, index) => (
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
