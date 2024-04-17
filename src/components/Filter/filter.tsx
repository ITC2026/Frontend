// Filter.tsx
import React, { useState } from 'react';
import filterIcon from '../../assets/filter-sort/Vector (2).png';

interface FilterProps {
    onFilter: (filter: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [filterValue, setFilterValue] = useState('');

    const handleFilterClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterValue(e.target.value);
    };

    const handleFilterSubmit = () => {
        onFilter(filterValue);
        setIsDropdownOpen(false);
    };

    return (
        <div onClick={handleFilterClick}>
            <img src={filterIcon} alt="Filter" className="logo-border" /> {/* Añadimos la clase 'logo-border' */}
            {isDropdownOpen && (
                <div>
                    <input type="text" value={filterValue} onChange={handleFilterChange} placeholder="Filter..." />
                    <button onClick={handleFilterSubmit}>Apply</button>
                </div>
            )}
        </div>
    );
};

export default Filter;
