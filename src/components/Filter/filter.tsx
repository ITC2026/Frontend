
import React, { useState } from 'react';
import './filter.css';

interface Project {
    name: string;
}

interface FilterProps {
    projects: Project[];
    onFilter: (filter: string[]) => void;
}

const Filter: React.FC<FilterProps> = ({ projects, onFilter }) => {
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
            <div className={`filter-dropdown ${isDropdownOpen ? 'open' : ''}`}>
                {projects.map((project, index) => (
                    <div key={project.name}>
                        <input
                            type="checkbox"
                            id={`project-${index}`}
                            value={project.name}
                            checked={selectedOptions.includes(project.name)}
                            onChange={() => handleOptionChange(project.name)}
                        />
                        <label htmlFor={`project-${index}`}>{project.name}</label>
                    </div>
                ))}
                <button onClick={handleFilterSubmit}>Apply</button>
            </div>
        </div>
    );
};

export default Filter;
