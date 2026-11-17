import React from 'react';

// Component for searching, category filter, and sorting
function Filters({ 
  searchText, 
  setSearchText, 
  categories, 
  selectedCategory, 
  setSelectedCategory, 
  sortBy, 
  setSortBy,
  resetFilters 
}) {
  return (
    <div style={{ border: '1px solid gray', padding: '15px', marginBottom: '20px' }}>
      {/* Search box */}
      <div style={{ marginBottom: '10px' }}>
        <label><b>Search Products: </b></label>
        <input
          type="text"
          placeholder="Type product name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ padding: '5px' }}
        />
      </div>

      {/* Category dropdown */}
      <div style={{ marginBottom: '10px' }}>
        <label><b>Filter by Category: </b></label>
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: '5px' }}
        >
          <option value="">All Categories</option>
          {categories.map((cat, index) => {
            // handle string or object format from dummyjson
            const name = typeof cat === 'object' ? cat.name : cat;
            const slug = typeof cat === 'object' ? cat.slug : cat;
            return (
              <option key={index} value={slug}>
                {name}
              </option>
            );
          })}
        </select>
      </div>

      {/* Sort dropdown */}
      <div style={{ marginBottom: '10px' }}>
        <label><b>Sort Products: </b></label>
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          style={{ padding: '5px' }}
        >
          <option value="">Normal</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-asc">Rating: Low to High</option>
          <option value="rating-desc">Rating: High to Low</option>
        </select>
      </div>

      {/* Reset button */}
      <button onClick={resetFilters} style={{ padding: '5px 10px', cursor: 'pointer' }}>
        Reset All
      </button>
    </div>
  );
}

export default Filters;
