import React from 'react';

function Pagination({ page, totalPages, totalData, limit, onPageChange }) {
  const pages = [];
  // Logic untuk menampilkan halaman (1 2 3 ... n)
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    if (page <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', totalPages);
    } else if (page >= totalPages - 3) {
      pages.push(1, '...');
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
    }
  }

  return (
    <nav className="mt-2 mb-5">
      <div className="d-flex justify-content-between align-items-center">
        <span className="text-muted ms-2" style={{ fontSize: 14 }}>
          {`Showing ${page} to ${totalPages} of ${totalData} results`}
        </span>
        <ul className="pagination mb-0" style={{ gap: 10, border: 'none' }}>
          <li
            style={{
              listStyle: 'none',
              cursor: page === 1 ? 'not-allowed' : 'pointer',
              color: page === 1 ? '#ccc' : '#444',
              padding: '0 8px',
              fontSize: 14,
            }}
            onClick={() => page > 1 && onPageChange(page - 1)}
          >
            &lt;
          </li>
          {pages.map((p, idx) =>
            p === '...' ? (
              <li key={`ellipsis-${idx}`} style={{ color: '#888', userSelect: 'none', padding: '0 8px' }}>...</li>
            ) : (
              <li
                key={p}
                style={{
                  listStyle: 'none',
                  cursor: 'pointer',
                  color: page === p ? '#fff' : '#444',
                  background: page === p ? '#F3C623' : 'transparent',
                  fontWeight: page === p ? 600 : 400,
                  borderRadius: 6,
                  border: page === p ? '1px solid #FFB22C' : '1px solid #eee',
                  padding: '2px 14px',
                  fontSize: 16,
                  transition: 'all 0.2s'
                }}
                onClick={() => onPageChange(p)}
              >
                {p}
              </li>
            )
          )}
          <li
            style={{
              listStyle: 'none',
              cursor: page === totalPages ? 'not-allowed' : 'pointer',
              color: page === totalPages ? '#ccc' : '#444',
              padding: '0 8px',
              fontSize: 14,
            }}
            onClick={() => page < totalPages && onPageChange(page + 1)}
          >
            &gt;
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Pagination;