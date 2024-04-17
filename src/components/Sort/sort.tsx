import React, { useState } from 'react';
import './Sort.css';

interface SortProps {
    onSort: (asc: boolean, field: string) => void;
    field: string;
}

const Sort: React.FC<SortProps> = ({ onSort, field }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSortClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSortOptionClick = (asc: boolean) => {
        onSort(asc, field);
        setIsDropdownOpen(false);
    };

    return (
        <div className="sort-container" onClick={handleSortClick}>
            <i className="bi bi-filter logo-border"></i>
            {isDropdownOpen && (
                <div className="sort-dropdown">
                    <button onClick={() => handleSortOptionClick(true)}>Sort A - Z</button>
                    <button onClick={() => handleSortOptionClick(false)}>Sort Z - A</button>
                </div>
            )}
        </div>
    );
};

export default Sort;
