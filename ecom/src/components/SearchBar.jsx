import React from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

function SearchBar({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory }) {
  const categories = [
    { id: 'all', name: 'All Types', icon: '🩸' },
    { id: 'A+', name: 'A+', icon: '🔴' },
    { id: 'A-', name: 'A-', icon: '🔴' },
    { id: 'B+', name: 'B+', icon: '🔵' },
    { id: 'B-', name: 'B-', icon: '🔵' },
    { id: 'AB+', name: 'AB+', icon: '🟣' },
    { id: 'AB-', name: 'AB-', icon: '🟣' },
    { id: 'O+', name: 'O+', icon: '🟢' },
    { id: 'O-', name: 'O-', icon: '🟢' }
  ];

  return (
    <div className="search-section">
      <div className="search-container">
        <div className="search-input-group">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search blood types, hospitals, or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-section">
          <FaFilter className="filter-icon" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="quick-filters">
        <span className="filter-label">Quick Filters:</span>
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Types
          </button>
          <button 
            className={`filter-btn ${selectedCategory === 'O-' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('O-')}
          >
            Universal Donor (O-)
          </button>
          <button 
            className={`filter-btn ${selectedCategory === 'AB+' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('AB+')}
          >
            Universal Recipient (AB+)
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar; 