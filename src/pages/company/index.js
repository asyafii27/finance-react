import React, { useEffect, useState } from 'react';
import TableData from '../../components/Table';
import Sidebar from '../../components/sidebar';
import Navbar from '../../components/navbar/Navbar';
import Pagination from '../../components/pagination/Pagination';
import CardHeader from '../../components/navbar/CardHeaderTitle';
import CreateCompanyModal from './CompanyCreate.js';
import CompanyFilterModal from './CompanyFilterModal.js';
import { ToastContainer, toast } from 'react-toastify';

const columns = [
    { key: 'code', label: 'Kode' },
    { key: 'nama', label: 'Nama Perusahaan' },
];

function CompanyPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalData, setTotalData] = useState(10);
    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [filter, setFilter] = useState({ nama: "", code: "" });

    useEffect(() => {
        let url = `${process.env.REACT_APP_URL_SERVER}/master/companies`;
        const params = [];
        if (page) params.push(`page=${page}`);
        if (limit) params.push(`limit=${limit}`);
        if (filter.nama) params.push(`nama=${encodeURIComponent(filter.nama)}`);
        if (filter.code) params.push(`code=${encodeURIComponent(filter.code)}`);
        if (params.length > 0) {
            url += `?${params.join('&')}`;
        }

        fetch(url)
            .then((res) => res.json())
            .then((result) => {
                console.log('result:', result); // cek isi respons
                setData(result.data || []);
                setLoading(false);
                setTotalPages(result.meta?.totalPages || 1);
                setTotalData(result.meta?.total || 1);
                setLimit(10);
            })
            .catch(() => setLoading(false));
    }, [page, limit, filter]);

    const handleCreate = (form) => {
        setLoading(true);
        fetch('http://localhost:3000/master/companies/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nama: form.nama,
                code: form.code,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                setShowModal(false);
                toast.success(result.message || 'Data berhasil ditambahkan');
                // Refresh data setelah sukses create
                return fetch('http://localhost:3000/master/companies')
                    .then((res) => res.json())
                    .then((result) => {
                        setData(result.data || []);
                        setLoading(false);
                    });
            })
            .catch(() => {
                setLoading(false);
                setShowModal(false);
                toast.error('Gagal menambahkan data');
            });
    };

    const handleEdit = (row) => {
        setEditData(row);
        setIsEdit(true);
        setShowModal(true);
    }

    const handleSubmit = (form) => {
        setLoading(true);

        if (isEdit && editData) {
            // edit mode
            let url = `${process.env.REACT_APP_URL_SERVER}/master/companies/edit/${editData.id}`;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nama: form.nama,
                    code: form.code
                }),
            })
                .then((res) => res.json())
                .then(() => {
                    setShowModal(false);
                    setIsEdit(false);
                    setEditData(null);

                    // refresh data
                    let listUrl = `${process.env.REACT_APP_URL_SERVER}/master/companies?page=${page}&limit=${limit}`;
                    return fetch(listUrl)
                        .then((res) => res.json())
                        .then((result) => {
                            setData(result.data || []);
                            setLoading(false);
                        });
                })
                .catch(() => {
                    setLoading(false);
                    setShowModal(false);
                    setIsEdit(false);
                    setEditData(null);
                    alert('Gagal mengambil data perusahaan')
                })
        } else {
            handleCreate(form)
        }
    }

    const handleDelete = (row) => {
        if (window.confirm(`Apakah Anda yakin ingin hapus data ini ${row.nama}?`)) {
            setLoading(true);
            fetch(`${process.env.REACT_APP_URL_SERVER}/master/companies/${row.id}`, {
                method: 'DELETE',
            })
                .then(async (res) => {
                    const result = await res.json();

                    if (!res.ok) {
                        throw new Error(result.message || 'Gagal menghapus data');
                    }

                    toast.success(result.message || 'Data berhasil dihapus');

                    const listUrl = `${process.env.REACT_APP_URL_SERVER}/master/companies?page=${page}&limit=${limit}`;
                    return fetch(listUrl)
                        .then((res) => res.json())
                        .then((result) => {
                            setData(result.data || []);
                            setLoading(false);
                        });
                })
                .catch((err) => {
                    setLoading(false);
                    toast.error(err.message || 'Gagal menghapus data');
                });

        }
    }

    return (
        <div className="d-flex" style={{ minHeight: '100vh' }}>
            <Sidebar />
            <div className="flex-grow-1">
                <Navbar />
                <CreateCompanyModal
                    show={showModal}
                    onClose={() => {
                        setShowModal(false);
                        setIsEdit(false);
                        setEditData(null);
                    }}
                    onSubmit={handleSubmit}
                    initialData={isEdit ? editData : undefined}
                    title={isEdit ? "Edit Perusahaan" : "Tambah Perusahaan"}
                />
                <CompanyFilterModal
                    key={JSON.stringify(filter)}
                    show={showFilter}
                    onClose={() => setShowFilter(false)}
                    onFilter={(f) => {
                        setFilter(f);
                        setPage(1);
                    }}
                    initialFilter={filter}
                />
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="container">
                        <div className="card shadow-sm">
                            <CardHeader
                                onCreate={() => setShowModal(true)}
                            />
                            <div className="card-body">
                                <div className="row mb-2">
                                    <div className="col-auto">
                                        <button
                                            className="btn btn-warning fw-bold rounded text-white"
                                            onClick={() => setShowFilter(true)}
                                        >
                                            <i className="bi bi-funnel"></i> Filter
                                        </button>
                                    </div>
                                    <div className="col-auto">
                                        <div
                                            id="activeFilter"
                                            className="ms-2 mb-1 d-flex align-items-center gap-2"
                                        >
                                            {/* Render filter aktif di sini */}
                                            {filter.nama && (
                                                <span className="border rounded px-3 py-1 bg-white">
                                                    <span className="text-dark fw-semibold">Perusahaan:</span> {filter.nama}
                                                </span>
                                            )}
                                            {filter.code && (
                                                <span className="border rounded px-3 py-1 bg-white">
                                                    <span className="text-dark fw-semibold">Kode:</span> {filter.code}
                                                </span>
                                            )}
                                            {(filter.nama || filter.code) && (
                                                <button
                                                    className="btn btn-warning btn-sm"
                                                    style={{ padding: '2px 10px' }}
                                                    onClick={() => setFilter({ nama: "", code: "" })}
                                                    title="Hapus filter"
                                                >
                                                    X
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <TableData
                                        columns={columns}
                                        data={data}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                        page={page}
                                        limit={limit}
                                    />
                                </div>
                            </div>
                            <Pagination page={page} totalPages={totalPages} totalData={totalData} onPageChange={setPage} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CompanyPage;