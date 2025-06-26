import React, { useState } from "react";

function CompanyFilterModal({ show, onClose, onFilter, initialFilter = {} }) {
  const [filter, setFilter] = useState({
    nama: initialFilter.nama || "",
    code: initialFilter.code || "",
  });

  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filter);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.3)" }}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Tambahkan Filter</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Nama Perusahaan</label>
                  <input
                    type="search"
                    className="form-control"
                    name="nama"
                    value={filter.nama}
                    onChange={handleChange}
                    placeholder="Masukkan nama perusahaan"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Kode Perusahaan</label>
                  <input
                    type="search"
                    className="form-control"
                    name="code"
                    value={filter.code}
                    onChange={handleChange}
                    placeholder="Masukkan kode perusahaan"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-warning btn-sm fw-bold text-white">
                <i class="bi bi-search"></i> Terapkan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CompanyFilterModal;