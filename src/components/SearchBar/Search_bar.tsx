// SearchBar.tsx
import React from 'react';
import './Search_bar.css'; 
import logo from '../../assets/search/Union.png'; 

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
                <img src={logo} alt="Logo" className="logo" />
            </div>
        </div>
    );
};

export default SearchBar;
