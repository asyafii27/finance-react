import React from 'react';

function TableData({ columns, data, onEdit, onDelete, page = 1, limit = 10 }) {
  return (
    <div class="card-body card shadow-sm">
      <div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th style={{ width: 60 }}>No.</th> {/* Tambahkan kolom No */}
              {columns.map((col) => (
                <th key={col.key} style={col.style}>{col.label}</th>
              ))}
              {(onEdit || onDelete) && <th style={{ width: 120 }}>Action</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={row.id}
                style={{
                  background: idx % 2 === 0 ? '#fff' : '#ffffcc' // putih untuk genap, kuning untuk ganjil
                }}
              >
                <td className="fw-semibold">{(idx + 1) + ((page - 1) * limit)}.</td> {/* Nomor urut */}
                {columns.map((col) => (
                  <td key={col.key} className={col.className || ''}>
                    {row[col.key] || '-'}
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
                <td colSpan={columns.length + 1 + ((onEdit || onDelete) ? 1 : 0)} className="text-center text-muted">
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableData;