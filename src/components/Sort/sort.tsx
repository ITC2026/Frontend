// Sort.tsx
import React, { useState } from 'react';
import sortIcon from '../../assets/filter-sort/Vector (2).png';
import './Sort.css';

interface SortProps {
    onSort: (sort: boolean) => void; // Asegúrate de que esta función acepte un booleano
}

const Sort: React.FC<SortProps> = ({ onSort }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSortClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSortOptionClick = (sort: boolean) => {
        onSort(sort);
        setIsDropdownOpen(false);
    };

    return (
        <div onClick={handleSortClick}>
            <img src={sortIcon} alt="Sort" className="logo-border" />
            {isDropdownOpen && (
                <div>
                    <button onClick={() => handleSortOptionClick(true)}>Sort A - Z</button>
                    <button onClick={() => handleSortOptionClick(false)}>Sort Z - A</button>
                </div>
            )}
        </div>
    );
};

export default Sort;
