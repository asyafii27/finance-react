import React from 'react';

function TableData({ columns, data, onEdit, onDelete, page = 1, limit = 10 }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th style={{ width: 60 }}>No.</th>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            {(onEdit || onDelete) && <th style={{ width: 120 }}>Action</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={row.id}
              style={{
                background: idx % 2 === 0 ? '#fff' : '#ffffcc'
              }}
            >
              <td className="fw-semibold">
                {(idx + 1) + ((page - 1) * limit)}.
              </td>

              {columns.map((col) => (
                <td key={col.key} className={col.className || ''}>
                  {col.key === 'rekening_code' ? (
                    <>
                      <div>{row.rekening_code || '-'}</div>
                      <div className="text-muted small">{row.rekening_nomor || '-'}</div>
                    </>
                  ) : col.render ? (
                    col.render(row)  // Gunakan custom render kalau ada
                  ) : (
                    row[col.key] || '-'
                  )}
                </td>
              ))}


              {(onEdit || onDelete) && (
                <td>
                  {onEdit && (
                    <button
                      className="btn btn-warning btn-sm me-2"
                      title="Edit"
                      onClick={() => onEdit(row)}
                    >
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                  )}
                  {onDelete && (
                    <button
                      className="btn btn-danger btn-sm"
                      title="Delete"
                      onClick={() => onDelete(row)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + 1 + ((onEdit || onDelete) ? 1 : 0)}
                className="text-center text-muted py-5"
              >
                <i
                  className="bi bi-database-x d-block mb-3 text-muted"
                  style={{ fontSize: '5rem' }}
                ></i>
                Tidak ada data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}


export default TableData;