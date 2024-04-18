// filter.tsx
import React, { useState } from 'react';
import './filter.css';

interface FilterProps {
    options: string[];
    onFilter: (filter: string[]) => void;
}

const Filter: React.FC<FilterProps> = ({ options, onFilter }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleFilterClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleOptionChange = (option: string) => {
        setSelectedOptions(prev => {
            if (prev.includes(option)) {
                return prev.filter(o => o !== option);
            } else {
                return [...prev, option];
            }
        });
    };

    const handleFilterSubmit = (event: React.MouseEvent) => {
        event.stopPropagation();
        onFilter(selectedOptions);
        setIsDropdownOpen(false);
    };

    return (
        <div className="filter-container" onClick={handleFilterClick}>
            <i className="bi bi-filter logo-border"></i>
            {isDropdownOpen && (
                <div className="filter-dropdown">
                    {options.map((option, index) => (
                        <div key={option}>
                            <input
                                type="checkbox"
                                id={`project-${index}`}
                                value={option}
                                checked={selectedOptions.includes(option)}
                                onChange={() => handleOptionChange(option)}
                            />
                            <label htmlFor={`project-${index}`}>{option}</label>
                        </div>
                    ))}
                    <button onClick={handleFilterSubmit}>Apply</button>
                </div>
            )}
        </div>
    );
};

export default Filter;
