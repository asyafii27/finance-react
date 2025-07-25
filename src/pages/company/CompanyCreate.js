import React, { useState, useEffect } from "react";

function CreateCompanyModal({ show, onClose, onSubmit, initialData, title = "Tambah Perusahaan" }) {
  const [form, setForm] = useState({ nama: "", code: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(initialData || { nama: "", code: "" });
    setErrors({});
  }, [initialData, show]);

  if (!show) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await onSubmit(form);

    // Kalau ada error validasi
    if (result && (result.nama || result.code)) {
      setErrors(result); // contoh: { nama: 'Nama wajib diisi', code: 'Code sudah ada' }
      return;
    }

    // Kalau error umum (bukan validasi Laravel)
    if (result && result.message) {
      const field = result.message.toLowerCase().includes("code") ? "code" : "nama";
      setErrors({ [field]: result.message });
      return;
    }

    // Sukses
    setErrors({});
    setForm({ nama: "", code: "" });
    // onClose();
  };

  return (
    <div className="modal d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.3)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label fw-semibold">Nama Perusahaan</label>
                <input
                  type="text"
                  className={`form-control ${errors.nama ? 'is-invalid' : ''}`}
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama perusahaan"
                  required
                />
                {errors.nama && <div className="invalid-feedback">{errors.nama}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Kode/Alias</label>
                <input
                  type="text"
                  className={`form-control ${errors.code ? 'is-invalid' : ''}`}
                  name="code"
                  value={form.code}
                  onChange={handleChange}
                  placeholder="Masukkan kode/alias"
                />
                {errors.code && <div className="invalid-feedback">{errors.code}</div>}
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
