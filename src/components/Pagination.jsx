import React from 'react';

// Pagination component with previous and next buttons
function Pagination({ page, totalPages, prevPage, nextPage }) {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px', padding: '10px' }}>
      <button onClick={prevPage} disabled={page <= 1} style={{ padding: '6px 12px' }}>
        Previous
      </button>

      <span style={{ margin: '0 15px' }}>
        Page {page} of {totalPages}
      </span>

      <button onClick={nextPage} disabled={page >= totalPages} style={{ padding: '6px 12px' }}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
