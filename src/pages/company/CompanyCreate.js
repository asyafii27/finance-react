import React, { useState, useEffect } from "react";

function CreateCompanyModal({ show, onClose, onSubmit, initialData, title = "Tambah Perusahaan" }) {
  const [form, setForm] = useState(initialData || { nama: "", code: "" });

  useEffect(() => {
    setForm(initialData || { nama: "", code: "" });
  }, [initialData]);

  if (!show) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ nama: "", code: "" });
  };

  return (
    <div className="modal d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.3)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label fw-semibold">Nama Perusahaan</label>
                <input
                  type="text"
                  className="form-control"
                  name="nama"
                  placeholder="Masukkan nama perusahaan"
                  value={form.nama}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Kode/Alias</label>
                <input
                  type="text"
                  className="form-control"
                  name="code"
                  placeholder="Masukkan kode/alias"
                  value={form.code}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                 Batal
              </button>
              <button type="submit" className="btn btn-warning fw-semibold text-white">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateCompanyModal;