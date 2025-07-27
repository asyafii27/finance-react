import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar/Navbar";
import Breadcrumb from "../../components/breadCrumb/BreadCrumb";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import Select from "react-select";
import { toast } from "react-toastify";

function IncomeCreatePage() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [isCompanyDisabled, setIsCompanyDisabled] = useState(true);

    const [divisies, setDivisies] = useState([]);
    const [isDivisiDisabled, setIsDivisiDisabled] = useState(true);

    const [categories, setCategories] = useState([]);
    const [isCategoryDisabled, setIsCategoryDisabled] = useState(true);

    const [products, setProducts] = useState([]);
    const [isProductDisabled, setIsProductDisabled] = useState(true);

    const [formData, setFormData] = useState({
        tanggal: "",
        perusahaan: "",
        divisi: "",
        kategori: "",
        produk: "",
        nominal_harga: "",
        nominal_diskon: "",
        harga_setelah_diskon: "",
        customer: "",
        website: "",
        rekening: "",
        bukti_transfer: null,
        keterangan: "",
    });

    useEffect(() => {
        fetchCompanies();
        fetchDivisies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${process.env.REACT_APP_URL_SERVER}/master/companies`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = res.data?.data || [];

            if (data.length > 0) {
                setCompanies(data);
                setIsCompanyDisabled(false);
            } else {
                setCompanies([]);
                setIsCompanyDisabled(true);
            }
        } catch (error) {
            toast.error('Gagal memuat perusahaan');
            console.error('Gagal memuat perusahaan:', error);
            setCompanies([]);
            setIsCompanyDisabled(true);
        }
    };

    const fetchDivisies = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${process.env.REACT_APP_URL_SERVER}/master/divisies`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = res.data?.data || [];

            if (data.length > 0) {
                setDivisies(data);
                setIsDivisiDisabled(false);
            } else {
                setDivisies([]);
                setIsDivisiDisabled(true);
            }
        } catch (error) {
            toast.error('Gagal memuat divisi');
            console.error('Gagal memuat divisi:', error);
            setDivisies([]);
            setIsDivisiDisabled(true);
        }
    };
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, tanggal: date });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form dikirim:", formData);
    };

    const handleCompanyChange = (selectedOption) => {
        setFormData({
            ...formData,
            perusahaan: selectedOption ? selectedOption.value : '',
        });
    };

    const handleDivisiChange = (selectedOption) => {
        setFormData({
            ...formData,
            divisi: selectedOption ? selectedOption.value : '',
        });
    };

    const companyOptions = companies.map((company) => ({
        value: company.id,
        label: company.nama
    }));

    const divisiOptions = divisies.map((divisi) => ({
        value: divisi.id,
        label: divisi.nama
    }));


    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
                <Navbar />
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="mx-5 my-5">
                        <div className="card shadow-sm">
                            <div className="card-header">
                                <div className="d-flex justify-content-between align-items-center bg-light rounded">
                                    <h5 className="fw-semibold">Tambah Pemasukkan</h5>
                                </div>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Tanggal Pengajuan <span className="text-danger"> *</span></label>
                                                <div className="d-flex">
                                                    <DatePicker
                                                        selected={formData.tanggal}
                                                        onChange={handleDateChange}
                                                        placeholderText="dd-mm-yyyy"
                                                        className="form-control w-100"
                                                        name="tanggal"
                                                        wrapperClassName="w-100"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Perusahaan <span className="text-danger">*</span>
                                                </label>
                                                <Select
                                                    name="perusahaan"
                                                    options={companyOptions}
                                                    value={companyOptions.find(opt => opt.value === formData.perusahaan)}
                                                    onChange={handleCompanyChange}
                                                    isDisabled={isCompanyDisabled}
                                                    placeholder={isCompanyDisabled ? "Data tidak ditemukan" : "Pilih Perusahaan"}
                                                    isSearchable
                                                    isClearable
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Divisi <span className="text-danger">*</span>
                                                </label>
                                                <Select
                                                    name="divisi"
                                                    options={divisiOptions}
                                                    value={divisiOptions.find(opt => opt.value === formData.divisi)}
                                                    onChange={handleDivisiChange}
                                                    isDisabled={isDivisiDisabled}
                                                    placeholder={isDivisiDisabled ? "Data divisi tidak ditemukan" : "Pilih Divisi"}
                                                    isSearchable
                                                    isClearable
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Kategori <span className="text-danger">*</span></label>
                                                <select className="form-select" name="kategori" value={formData.kategori} onChange={handleChange} required>
                                                    <option value="">Pilih Kategori</option>
                                                    <option value="Kategori A">Kategori A</option>
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Nama Customer <span className="text-danger">*</span></label>
                                                <input type="text" className="form-control" name="customer" value={formData.customer} onChange={handleChange} required />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Nama Website</label>
                                                <input type="text" className="form-control" name="website" value={formData.website} onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Produk <span className="text-danger">*</span></label>
                                                    <select className="form-select" name="produk" value={formData.produk} onChange={handleChange} required>
                                                        <option value="">Pilih Produk</option>
                                                        <option value="Produk X">Produk X</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Nominal Harga <span className="text-danger">*</span></label>
                                                    <input type="number" className="form-control" name="nominal_harga" value={formData.nominal_harga} onChange={handleChange} required />
                                                </div>
                                                <div className="col-md-6 mt-3">
                                                    <label className="form-label">Nominal Diskon <span className="text-danger">*</span></label>
                                                    <input type="number" className="form-control" name="nominal_diskon" value={formData.nominal_diskon} onChange={handleChange} required />
                                                </div>
                                                <div className="col-md-6 mt-3">
                                                    <label className="form-label">Harga Setelah Diskon <span className="text-danger">*</span></label>
                                                    <input type="number" className="form-control" name="harga_setelah_diskon" value={formData.harga_setelah_diskon} onChange={handleChange} required />
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Rekening</label>
                                                <select className="form-select" name="rekening" value={formData.rekening} onChange={handleChange}>
                                                    <option value="">Pilih Rekening</option>
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Bukti Transfer <span className="text-danger">*</span></label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    name="bukti_transfer"
                                                    accept="image/png,image/jpeg,image/webp"
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <small className="text-muted">Format file: png, jpg, jpeg, webp</small>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Keterangan</label>
                                                <textarea className="form-control" rows="3" name="keterangan" value={formData.keterangan} onChange={handleChange}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end gap-2 mt-3">
                                        <button type="button" className="btn btn-warning" onClick={() => navigate(-1)}>Kembali</button>
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default IncomeCreatePage;
