import React from 'react';
import './SearchBar.css'; 


interface SearchBarProps {
    onSearchTermChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchTermChange }) => {
    return (
        <div className="search-container">
            <div className="search-input-container">
                <input
                    type="text"
                    placeholder="Buscar..."
                    className="search-input"
                    onChange={e => onSearchTermChange(e.target.value)}
                />
            </div>
            <div className="logo-container">
                <i className="bi bi-search" />
            </div>
        </div>
    );
};

export default SearchBar;