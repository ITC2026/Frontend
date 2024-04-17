// Filter.tsx
import React, { useState } from 'react';
import filterIcon from '../../assets/filter-sort/vector (2).png';
import './Filter.css';

interface FilterProps {
    onFilter: (filter: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [filterValue, setFilterValue] = useState('');

    const handleFilterClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterValue(e.target.value);
    };

    const handleFilterSubmit = (event: React.MouseEvent) => {
        event.stopPropagation();
        onFilter(filterValue);
        setIsDropdownOpen(false);
    };

    return (
        <div className="filter-container" onClick={handleFilterClick}>
            <img src={filterIcon} alt="Filter" className="logo-border" />
            {isDropdownOpen && (
                <div className="filter-dropdown">
                    <input type="text" value={filterValue} onChange={handleFilterChange} placeholder="Filter..." />
                    <button onClick={handleFilterSubmit}>Apply</button>
                </div>
            )}
        </div>
    );
};

export default Filter;
